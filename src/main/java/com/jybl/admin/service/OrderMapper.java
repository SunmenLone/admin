package com.jybl.admin.service;

import com.jybl.admin.entity.OrderEntity;
import com.jybl.admin.service.provider.OrderProvider;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

@Mapper
public interface OrderMapper {

    @SelectProvider(type = OrderProvider.class, method = "selectOrder")
    List<OrderEntity> findAll(OrderEntity orderEntity, Long first, Long limit);

    @Select("SELECT COUNT(*) FROM PURCHASED_SERVICE")
    Integer getCount();

}
