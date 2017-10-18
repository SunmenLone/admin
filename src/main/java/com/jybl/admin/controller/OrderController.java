package com.jybl.admin.controller;


import com.jybl.admin.entity.OrderEntity;
import com.jybl.admin.service.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    OrderMapper orderMapper;

    @RequestMapping("/listAll")
    public Map findAllOrder(HttpServletRequest request) {

        Long first = 1L, limit = 30L;

        if (request.getParameter("page") != null && request.getParameter("limit") != null) {
            limit = Long.valueOf(request.getParameter("limit"));
            first = (Long.valueOf(request.getParameter("page")) - 1) * limit;
        }

        OrderEntity oe = new OrderEntity();

        if (request.getParameter("status") != null && request.getParameter("status").length() > 0) {
            oe.setIndent_status(request.getParameter("status"));
        }

        if (request.getParameter("name") != null && request.getParameter("name").length() > 0) {
            oe.setName(request.getParameter("name"));
        }

        if (request.getParameter("docName") != null && request.getParameter("docName").length() > 0) {
            oe.setDoctor_name(request.getParameter("docName"));
        }

        if (request.getParameter("patName") != null && request.getParameter("patName").length() > 0) {
            oe.setPatient_name(request.getParameter("patName"));
        }

        if (request.getParameter("startTime") != null && request.getParameter("startTime").length() > 0) {
            if (request.getParameter("endTime") != null && request.getParameter("endTime").length() > 0){
                oe.setPurchased_time(request.getParameter("startTime") + "|" + request.getParameter("endTime"));
            } else {
                SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
                oe.setPurchased_time(request.getParameter("startTime") + "|" + sdf.format(new Date()));
            }
        } else {
            if (request.getParameter("endTime") != null && request.getParameter("endTime").length() > 0){
                oe.setPurchased_time("2000-01-01 00:00:00|" + request.getParameter("endTime"));
            }
        }

        List<OrderEntity> list = orderMapper.findAll(oe, first, limit);

        int i = 1;
        for (OrderEntity orderEntity : list) {
            orderEntity.setId(Integer.toUnsignedLong(i));
            String time = orderEntity.getPurchased_time();
            orderEntity.setPurchased_time(time.substring(0, time.length() - 2));
            switch(Integer.valueOf(orderEntity.getIndent_status())) {
                case 0:
                    orderEntity.setIndent_status("未付款");
                    break;
                case 1:
                    orderEntity.setIndent_status("已支付");
                    break;
                case 2:
                    orderEntity.setIndent_status("已完成");
                    break;
                case 99:
                    orderEntity.setIndent_status("已过期");
                    break;
            }
            i++;
        }

        Map map = new HashMap();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", orderMapper.getCount());
        map.put("data", list);
        return map;
    }

    @RequestMapping("/listPatient")
    public Map findOrderWithPatient(HttpServletRequest request) {
        Long first = 1L, limit = 30L;

        if (request.getParameter("page") != null && request.getParameter("limit") != null) {
            limit = Long.valueOf(request.getParameter("limit"));
            first = (Long.valueOf(request.getParameter("page")) - 1) * limit;
        }

        String wechatId = "";
        if (request.getParameter("wechatId") != null && request.getParameter("wechatId").length() > 0) {
            wechatId = request.getParameter("wechatId");
        }

        List<OrderEntity> list = orderMapper.findByWechatId(wechatId, first, limit);

        int i = 1;
        for (OrderEntity orderEntity : list) {
            orderEntity.setId(Integer.toUnsignedLong(i)) ;
            String time = orderEntity.getPurchased_time();
            orderEntity.setPurchased_time(time.substring(0, time.length() - 2));
            switch(Integer.valueOf(orderEntity.getIndent_status())) {
                case 0:
                    orderEntity.setIndent_status("未付款");
                    break;
                case 1:
                    orderEntity.setIndent_status("已支付");
                    break;
                case 2:
                    orderEntity.setIndent_status("已完成");
                    break;
                case 99:
                    orderEntity.setIndent_status("已过期");
                    break;
            }
            i++;
        }

        Map map = new HashMap();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", orderMapper.getCountByWechatId(wechatId));
        map.put("data", list);
        return map;
    }

    @RequestMapping("/listDoctor")
    public Map findOrderWithDoctor(HttpServletRequest request) {
        Long first = 1L, limit = 30L;

        if (request.getParameter("page") != null && request.getParameter("limit") != null) {
            limit = Long.valueOf(request.getParameter("limit"));
            first = (Long.valueOf(request.getParameter("page")) - 1) * limit;
        }

        String phone = "";
        if (request.getParameter("phone") != null && request.getParameter("phone").length() > 0) {
            phone = request.getParameter("phone");
        }

        List<OrderEntity> list = orderMapper.findByPhone(phone, first, limit);

        int i = 1;
        for (OrderEntity orderEntity : list) {
            orderEntity.setId(Integer.toUnsignedLong(i)) ;
            String time = orderEntity.getPurchased_time();
            orderEntity.setPurchased_time(time.substring(0, time.length() - 2));
            switch(Integer.valueOf(orderEntity.getIndent_status())) {
                case 0:
                    orderEntity.setIndent_status("未付款");
                    break;
                case 1:
                    orderEntity.setIndent_status("已支付");
                    break;
                case 2:
                    orderEntity.setIndent_status("已完成");
                    break;
                case 99:
                    orderEntity.setIndent_status("已过期");
                    break;
            }
            i++;
        }

        Map map = new HashMap();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", orderMapper.getCountByPhone(phone));
        map.put("data", list);
        return map;
    }

}
