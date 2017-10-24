package com.jybl.admin.dao;

import com.jybl.admin.entity.DoctorServiceEntity;
import com.jybl.admin.entity.ServiceEntity;
import com.jybl.admin.dao.provider.ServiceProvider;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ServiceMapper {

    @Select("SELECT COUNT(*) FROM SERVICE")
    Integer getCount();

    @SelectProvider(type = ServiceProvider.class, method = "selectService")
    List<ServiceEntity> findAll(ServiceEntity serviceEntity, Long first, Long limit);

    @Insert("INSERT INTO SERVICE (NAME, PRICE, COUNT, DURATION, CONTENT, KIND, RISK_LEVEL_ID) VALUES (#{name}, #{price}, #{count}, #{duration}, #{content}, #{kind}, #{riskLevelId})")
    Integer addService(ServiceEntity serviceEntity);

    @SelectProvider(type = ServiceProvider.class, method = "updateService")
    Integer updateService(ServiceEntity serviceEntity);

    @Update("UPDATE SERVICE SET STATUS = #{status} WHERE ID = #{id}")
    Integer updateServiceStatus(@Param("id") Long id, @Param("status") Integer status);

    @Delete("DELETE FROM SERVICE WHERE ID = #{id}")
    Integer deleteService(@Param("id") Long id);

    @Select("SELECT A.*, B.KIND, COUNT(C.INDENT_NUMBER) AS PURCHASED_COUNT FROM (SELECT * FROM DOCTOR_SERVICE WHERE DOCTOR_PHONE = #{phone}) A LEFT JOIN (SELECT ID, KIND FROM SERVICE) B ON A.SERVICE_ID = B.ID LEFT JOIN (SELECT INDENT_NUMBER, SERVICE_ID FROM PURCHASED_SERVICE WHERE DOCTOR_PHONE = #{phone}) C ON A.SERVICE_ID = C.SERVICE_ID GROUP BY A.SERVICE_ID LIMIT #{first}, #{limit}")
    List<DoctorServiceEntity> findDoctorService(@Param("phone") String phone, @Param("first") Long first, @Param("limit") Long limit);

    @Select("SELECT COUNT(*) FROM DOCTOR_SERVICE WHERE DOCTOR_PHONE = #{phone}")
    Integer getDocServiceCount(@Param("phone") String phone);

    @Update("UPDATE DOCTOR_SERVICE SET ADDED_STATUS=#{status}, ADDED_TIME=#{time} WHERE ID = #{id}")
    Integer updateDocServiceStatus(@Param("id") Long id, @Param("status") Integer status, @Param("time") String time);

    @Select("SELECT * FROM SERVICE WHERE STATUS = 1 AND ID NOT IN (SELECT SERVICE_ID FROM DOCTOR_SERVICE WHERE DOCTOR_PHONE=#{phone}) LIMIT #{first}, #{limit}")
    List<ServiceEntity> findAllAvailable(@Param("phone") String phone, @Param("first") Long first, @Param("limit") Long limit);

    @Select("SELECT COUNT(*) FROM SERVICE WHERE STATUS = 1 AND ID NOT IN (SELECT SERVICE_ID FROM DOCTOR_SERVICE WHERE DOCTOR_PHONE=#{phone})")
    Integer getAvailableCount(@Param("phone") String phone);

    @Insert("INSERT INTO DOCTOR_SERVICE (DOCTOR_PHONE, SERVICE_ID, SERVICE_NAME, SERVICE_PRICE, SERVICE_COUNT, SERVICE_DURATION, ADDED_TIME) VALUES (#{doctor_phone}, #{service_id}, #{service_name}, #{service_price}, #{service_count}, #{service_duration}, #{added_time})")
    Integer addDocService(DoctorServiceEntity doctorServiceEntity);

}
