package com.jybl.admin.service.provider;

import com.jybl.admin.entity.DoctorEntity;

public class DoctorProvider {

    public String selectDoctor(DoctorEntity doctorEntity, Long first, Long limit) {

        StringBuffer sb = new StringBuffer();
        sb.append("SELECT A.PHONE, A.NAME, A.SEX, A.TITLE, A.DEPARTMENT, A.VERIFY, A.DATETIME, COUNT(B.INDENT_NUMBER) AS COUNT FROM DOCTOR_INFO A LEFT JOIN PURCHASED_SERVICE B ON A.PHONE = B.DOCTOR_PHONE WHERE 1=1");

        if( doctorEntity.getSex() != null) {
            sb.append(" AND A.SEX='" + doctorEntity.getSex() +"'");
        }

        if (doctorEntity.getTitle() != null) {
            sb.append(" AND A.TITLE='" + doctorEntity.getTitle() + "'");
        }

        if (doctorEntity.getVerify() != null) {
            sb.append(" AND A.VERIFY='" + doctorEntity.getVerify() + "'");
        }

        if (doctorEntity.getName() != null) {
            sb.append(" AND A.NAME LIKE '%" + doctorEntity.getName() + "%'");
        }

        if (doctorEntity.getDepartment() != null) {
            sb.append(" AND A.DEPARTMENT='" + doctorEntity.getDepartment() + "'");
        }

        sb.append(" GROUP BY A.PHONE LIMIT " + first.toString() + ", " + limit.toString());

        return sb.toString();

    }
}
