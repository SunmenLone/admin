package com.jybl.admin.service;

import com.jybl.admin.dao.DoctorMapper;
import com.jybl.admin.entity.DoctorEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    DoctorMapper doctorMapper;

    public Integer getCount() {
       return  doctorMapper.getCount();
    }

    public List<DoctorEntity> findAll(DoctorEntity doctorEntity, Long first, Long limit) {
        List<DoctorEntity> list = doctorMapper.findAll(doctorEntity, first, limit);
        int i = 1;
        for (DoctorEntity de : list) {
            de.setId(Integer.toUnsignedLong(i));
            String time = doctorEntity.getDatetime();
            de.setDatetime(time.substring(0, time.length() - 2));
            i++;
        }

        return list;
    }

    public DoctorEntity findByPhone(String phone) {
        return doctorMapper.findByPhone(phone);
    }


    public Integer addDoctor(DoctorEntity doctorEntity) {
        return doctorMapper.addDoctor(doctorEntity);
    }

    public Integer editDoctor(DoctorEntity doctorEntity){
        return doctorMapper.editDoctor(doctorEntity);
    }

    public Integer verifyDoctor(String phone, String verify){
        return doctorMapper.verifyDoctor(phone, verify);
    };

    public Integer deleteDoctor(String phone) {
        return doctorMapper.deleteDoctor(phone);
    };


}
