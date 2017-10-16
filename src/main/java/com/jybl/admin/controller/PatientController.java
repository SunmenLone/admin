package com.jybl.admin.controller;


import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.util.JSONWrappedObject;
import com.jybl.admin.entity.ServiceEntity;
import com.jybl.admin.service.ServiceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/service")
public class ServiceController {

    @Autowired
    ServiceMapper serviceMapper;

    @RequestMapping("/listAll")
    public Map findAllService(HttpServletRequest request) {

        Long first = 1L, limit = 30L;

        if (request.getParameter("page") != null && request.getParameter("limit") != null) {
            limit = Long.valueOf(request.getParameter("limit"));
            first = (Long.valueOf(request.getParameter("page")) - 1) * limit;
        }

        List<ServiceEntity> list;
        if (request.getParameter("name") != null && request.getParameter("status") == null) {
            list = serviceMapper.findByName("%"+request.getParameter("name")+"%", first, limit);
        } else if (request.getParameter("name") == null && request.getParameter("status") != null) {
            list = serviceMapper.findByStatus(Integer.valueOf(request.getParameter("status")), first, limit);
        } else if (request.getParameter("name") != null && request.getParameter("status") != null) {
            list = serviceMapper.findByNameAndStatus("%"+request.getParameter("name")+"%", Integer.valueOf(request.getParameter("status")), first, limit);
        } else {
            list = serviceMapper.findAll(first, limit);
        }

        Map map = new HashMap();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", serviceMapper.getCount());
        map.put("data", list);
        return map;
    }

    @RequestMapping("/add")
    public Map addNewService(HttpServletRequest request) {

        Map map = new HashMap();

        try {

            ServiceEntity serviceEntity = new ServiceEntity();
            serviceEntity.setName(request.getParameter("name"));
            serviceEntity.setContent(request.getParameter("content"));
            serviceEntity.setKind(request.getParameter("kind"));
            serviceEntity.setDuration(request.getParameter("duration"));
            serviceEntity.setCount(Integer.valueOf(request.getParameter("count")));
            serviceEntity.setPrice(request.getParameter("price"));

            serviceMapper.addService(serviceEntity);

            map.put("code", 0);

        } catch (Exception e) {

            map.put("code", -1);

        }

        return map;

    }

    @RequestMapping("/edit")
    public Map editService(HttpServletRequest request) {

        Map map = new HashMap();

        try {

            ServiceEntity serviceEntity = new ServiceEntity();
            serviceEntity.setId(Long.valueOf(request.getParameter("id")));

            if ( request.getParameter("name") != null ) {
                serviceEntity.setName(request.getParameter("name"));
            }

            if ( request.getParameter("content") != null ) {
                serviceEntity.setContent(request.getParameter("content"));
            }

            if ( request.getParameter("riskLevelId") != null ) {
                serviceEntity.setRiskLevelId(request.getParameter("riskLevelId"));
            }

            if ( request.getParameter("kind") != null ) {
                serviceEntity.setKind(request.getParameter("kind"));
            }

            if ( request.getParameter("duration") != null ) {
                serviceEntity.setDuration(request.getParameter("duration"));
            }

            if ( request.getParameter("count") != null ) {
                serviceEntity.setCount(Integer.valueOf(request.getParameter("count")));
            }

            if ( request.getParameter("price") != null ) {
                serviceEntity.setPrice(request.getParameter("price"));
            }

            serviceMapper.updateService(serviceEntity);

            map.put("code", 0);

        } catch (Exception e) {

            map.put("code", -1);

        }

        return map;

    }

    @RequestMapping("/del")
    public Map delService(HttpServletRequest request) {

        Map map = new HashMap();

        try {

            Long id = Long.valueOf(request.getParameter("id"));

            serviceMapper.deleteService(id);

            map.put("code", 0);

        } catch (Exception e) {

            System.out.println(e.toString());

            map.put("code", -1);

        }

        return map;
    }

    @RequestMapping("/changeStatus")
    public Map changeServiceStatus(HttpServletRequest request) {

        Map map = new HashMap();

        try {

            Long id = Long.valueOf(request.getParameter("id"));

            Integer status = Integer.valueOf(request.getParameter("status"));

            serviceMapper.updateServiceStatus(id, status);

            map.put("code", 0);

        } catch (Exception e) {

            System.out.println(e.toString());

            map.put("code", -1);

        }

        return map;
    }

}
