package com.jybl.admin.service;

import com.jybl.admin.entity.PatientEntity;
import com.jybl.admin.service.provider.PatientProvider;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

@Mapper
public interface PatientMapper {

    @SelectProvider(type = PatientProvider.class, method = "selectPatient")
    List<PatientEntity> findAll(PatientEntity patientEntity, Long first, Long limit);

}
