package com.jybl.admin.controller;


import com.jybl.admin.service.StatisticMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/statistic")
public class StatisticController {

    @Autowired
    StatisticMapper statisticMapper;

    @RequestMapping("/listAll")
    public Map getStatistic(HttpServletRequest request) {

        Map map = new HashMap();
        map.put("code", 0);
        map.put("msg", "");
        map.put("orderStatistic", statisticMapper.get12MonthOrderStatistic());
        map.put("orderOverview", statisticMapper.getOverviewOrderStatistic());
        map.put("groupStatistic", statisticMapper.getRangeGroup());
        map.put("userStatistic", statisticMapper.get12MonthUserStatistic());
        map.put("userOverview", statisticMapper.getOverviewUserStatistic());

        return map;

    }

}
