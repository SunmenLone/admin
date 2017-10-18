package com.jybl.admin.service;

import com.jybl.admin.entity.DoctorEntity;
import com.jybl.admin.service.provider.DoctorProvider;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

@Mapper
public interface DoctorMapper {

    @Select("SELECT COUNT(*) FROM DOCTOR_INFO")
    Integer getCount();

    @SelectProvider(type = DoctorProvider.class, method = "selectDoctor")
    List<DoctorEntity> findAll(DoctorEntity orderEntity, Long first, Long limit);

}
