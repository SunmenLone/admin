package com.jybl.admin.controller;


import com.jybl.admin.entity.DoctorEntity;
import com.jybl.admin.entity.OrderEntity;
import com.jybl.admin.service.DoctorMapper;
import com.jybl.admin.service.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    @Autowired
    DoctorMapper doctorMapper;

    @RequestMapping("/listAll")
    public Map findAllDoctor(HttpServletRequest request) {

        Long first = 1L, limit = 30L;

        if (request.getParameter("page") != null && request.getParameter("limit") != null) {
            limit = Long.valueOf(request.getParameter("limit"));
            first = (Long.valueOf(request.getParameter("page")) - 1) * limit;
        }

        DoctorEntity de = new DoctorEntity();

        if (request.getParameter("sex") != null && request.getParameter("sex").length() > 0) {
            de.setSex(request.getParameter("sex"));
        }

        if (request.getParameter("title") != null && request.getParameter("title").length() > 0) {
            de.setTitle(request.getParameter("title"));
        }

        if (request.getParameter("verify") != null && request.getParameter("verify").length() > 0) {
            de.setVerify(request.getParameter("verify"));
        }

        if (request.getParameter("name") != null && request.getParameter("name").length() > 0) {
            de.setName(request.getParameter("name"));
        }

        if (request.getParameter("department") != null && request.getParameter("department").length() > 0) {
            de.setDepartment(request.getParameter("department"));
        }

        List<DoctorEntity> list = doctorMapper.findAll(de, first, limit);

        int i = 1;
        for (DoctorEntity doctorEntity : list) {
            doctorEntity.setId(Integer.toUnsignedLong(i));
            i++;
        }

        Map map = new HashMap();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", doctorMapper.getCount());
        map.put("data", list);
        return map;
    }

}
