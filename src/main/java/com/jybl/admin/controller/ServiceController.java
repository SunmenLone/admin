package com.jybl.admin.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jybl.admin.entity.DoctorServiceEntity;
import com.jybl.admin.entity.ServiceEntity;
import com.jybl.admin.service.ServiceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
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

        ServiceEntity se = new ServiceEntity();

        if (request.getParameter("name") != null && request.getParameter("name").length() > 0) {
            se.setName(request.getParameter("name"));
        }

        if (request.getParameter("status") != null && request.getParameter("status").length() > 0) {
            se.setStatus(request.getParameter("status"));
        }

        List<ServiceEntity> list = serviceMapper.findAll(se, first, limit);

        int i = 1;
        for (ServiceEntity serviceEntity : list) {
            if (serviceEntity.getStatus().equals("1")) {
                serviceEntity.setStatus("已激活");
            } else {
                serviceEntity.setStatus("冻结");
            }
            serviceEntity.setRid(Integer.toUnsignedLong(i));
            i++;
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
            serviceEntity.setRisk_level_id(request.getParameter("riskLevelId"));
            serviceEntity.setKind(request.getParameter("kind"));
            serviceEntity.setDuration(request.getParameter("duration"));
            serviceEntity.setCount(Integer.valueOf(request.getParameter("count")));
            serviceEntity.setPrice(request.getParameter("price"));

            serviceMapper.addService(serviceEntity);

            map.put("code", 0);

        } catch (Exception e) {

            System.out.println(e.toString());

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
                serviceEntity.setRisk_level_id(request.getParameter("riskLevelId"));
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

    @RequestMapping("/listDocService")
    public Map findDocAllService(HttpServletRequest request) {

        Long first = 1L, limit = 30L;

        if (request.getParameter("page") != null && request.getParameter("limit") != null) {
            limit = Long.valueOf(request.getParameter("limit"));
            first = (Long.valueOf(request.getParameter("page")) - 1) * limit;
        }

        String phone = "";

        if (request.getParameter("phone") != null && request.getParameter("phone").length() > 0) {
            phone = request.getParameter("phone");
        }

        List<DoctorServiceEntity> list = serviceMapper.findDoctorService(phone, first, limit);

        int i = 1;
        for (DoctorServiceEntity doctorServiceEntity : list) {
            if (doctorServiceEntity.getAdded_status() == 0) {
                doctorServiceEntity.setAdded_time("已下架");
            }
            doctorServiceEntity.setRid(doctorServiceEntity.getId());
            doctorServiceEntity.setId(Integer.toUnsignedLong(i));
            i++;
        }

        Map map = new HashMap();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", serviceMapper.getDocServiceCount(phone));
        map.put("data", list);
        return map;
    }

    @RequestMapping("/changeDocSerStatus")
    public Map changeDocServiceStatus(HttpServletRequest request) {

        Map map = new HashMap();

        try {

            Long id = Long.valueOf(request.getParameter("id"));

            Integer status = Integer.valueOf(request.getParameter("status"));

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            String time = "";
            if (status == 1) {
                time = sdf.format(new Date());
            }

            serviceMapper.updateDocServiceStatus(id, status, time);

            map.put("code", 0);

        } catch (Exception e) {

            System.out.println(e.toString());

            map.put("code", -1);

        }

        return map;
    }

    @RequestMapping("/listAllAvailable")
    public Map findAllAvailableService(HttpServletRequest request) {

        Long first = 1L, limit = 30L;

        if (request.getParameter("page") != null && request.getParameter("limit") != null) {
            limit = Long.valueOf(request.getParameter("limit"));
            first = (Long.valueOf(request.getParameter("page")) - 1) * limit;
        }

        String phone = "";
        if (request.getParameter("phone") != null && request.getParameter("phone").length() >0) {
            phone = request.getParameter("phone");
        }

        List<ServiceEntity> list = serviceMapper.findAllAvailable(phone, first, limit);

        int i = 1;
        for (ServiceEntity serviceEntity : list) {
            serviceEntity.setRid(Integer.toUnsignedLong(i));
            i++;
        }

        Map map = new HashMap();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", serviceMapper.getAvailableCount(phone));
        map.put("data", list);
        return map;
    }

    @RequestMapping(value="/addDocService", method = RequestMethod.POST)
    public Map addDocService(HttpServletRequest request, @RequestBody String requestBody) {

        Map map = new HashMap();

        try {

            JSONObject jo = JSON.parseObject(requestBody);
            String phone = jo.getString("phone");

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String time = sdf.format(new Date());

            List<ServiceEntity> rows = JSON.parseArray(jo.getString("rows"), ServiceEntity.class);

            for (ServiceEntity se : rows) {

                DoctorServiceEntity doctorServiceEntity = new DoctorServiceEntity();
                doctorServiceEntity.setDoctor_phone(phone);
                doctorServiceEntity.setService_id(se.getId());
                doctorServiceEntity.setService_name(se.getName());
                doctorServiceEntity.setService_price(se.getPrice());
                doctorServiceEntity.setService_count(se.getCount());
                doctorServiceEntity.setService_duration(se.getDuration());
                doctorServiceEntity.setAdded_time(time);

                serviceMapper.addDocService(doctorServiceEntity);
            }


            map.put("code", 0);

        } catch (Exception e) {

            System.out.println(e.toString());

            map.put("code", -1);

        }

        return map;

    }

}
