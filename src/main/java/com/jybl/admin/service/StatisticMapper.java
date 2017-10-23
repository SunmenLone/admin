package com.jybl.admin.service;

import com.jybl.admin.entity.OrderEntity;
import com.jybl.admin.entity.OrderStatisticEntity;
import com.jybl.admin.service.provider.OrderProvider;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

@Mapper
public interface StatisticMapper {


    @Select("SELECT R.month, ifnull(S.COUNT, 0) as count, ifnull(S.TOTAL, 0) as total FROM PAST_12_MONTH_VIEW R LEFT JOIN (SELECT DATE_FORMAT(T.PURCHASED_TIME,'%Y-%m') AS MONTH, COUNT(T.INDENT_NUMBER) AS COUNT, SUM(T.PRICE) AS TOTAL FROM PURCHASED_SERVICE T WHERE DATE_FORMAT(T.PURCHASED_TIME,'%Y-%m')>DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 12 month),'%Y-%m') GROUP BY MONTH) S ON R.month = S.MONTH GROUP BY R.month")
    List<OrderStatisticEntity> get12MonthStatistic();

    @Select("SELECT * FROM (SELECT IFNULL(COUNT(*), 0) AS COUNT, IFNULL(SUM(PRICE), 0) AS TOTAL FROM PURCHASED_SERVICE WHERE DATE(PURCHASED_TIME) > DATE(DATE_SUB(CURDATE(), INTERVAL 12 month)) UNION (SELECT IFNULL(COUNT(*), 0) AS COUNT, IFNULL(SUM(PRICE), 0) AS TOTAL FROM PURCHASED_SERVICE WHERE DATE(PURCHASED_TIME) = DATE(CURDATE()))) A")
    List<OrderStatisticEntity> getOverviewStatistic();

}
