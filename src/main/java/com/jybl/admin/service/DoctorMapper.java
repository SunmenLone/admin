package com.jybl.admin.service;

import com.jybl.admin.entity.DoctorEntity;
import com.jybl.admin.service.provider.DoctorProvider;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DoctorMapper {

    @Select("SELECT COUNT(*) FROM DOCTOR_INFO")
    Integer getCount();

    @SelectProvider(type = DoctorProvider.class, method = "selectDoctor")
    List<DoctorEntity> findAll(DoctorEntity doctorEntity, Long first, Long limit);

    @Select("SELECT * FROM DOCTOR_INFO WHERE PHONE = #{phone}")
    DoctorEntity findByPhone(@Param("phone") String phone);

    @Insert("INSERT INTO DOCTOR_INFO (PHONE, PASSWORD, NAME, SEX, PRACTICE_CODE, HOSPITAL, TITLE, DEPARTMENT, HEAD_PIC, PRACTICE_PIC, ADEPT, EXPERIENCE, VERIFY) VALUES (#{phone}, #{password}, #{name}, #{sex}, #{practice_code}, #{hospital}, #{title}, #{department}, #{head_pic}, #{practice_pic}, #{adept}, #{experience}, #{verify})")
    Integer addDoctor(DoctorEntity doctorEntity);
}
