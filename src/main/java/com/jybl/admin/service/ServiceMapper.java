package com.jybl.admin.service;

import com.jybl.admin.entity.ServiceEntity;
import com.jybl.admin.service.provider.ServiceProvider;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ServiceMapper {

    @Select("SELECT COUNT(*) FROM SERVICE")
    Integer getCount();

    @SelectProvider(type = ServiceProvider.class, method = "selectService")
    List<ServiceEntity> findAll(ServiceEntity serviceEntity, Long first, Long limit);

    @Insert("INSERT INTO SERVICE (NAME, PRICE, COUNT, DURATION, CONTENT, KIND, RISK_LEVEL_ID) VALUES (#{name}, #{price}, #{count}, #{duration}, #{content}, #{kind}, #{riskLevelId})")
    int addService(ServiceEntity serviceEntity);

    @SelectProvider(type = ServiceProvider.class, method = "updateService")
    int updateService(ServiceEntity serviceEntity);

    @Update("UPDATE SERVICE SET STATUS = #{status} WHERE ID = #{id}")
    int updateServiceStatus(@Param("id") Long id, @Param("status") Integer status);

    @Delete("DELETE FROM SERVICE WHERE ID = #{id}")
    int deleteService(@Param("id") Long id);

}
