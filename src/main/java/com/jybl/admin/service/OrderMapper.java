package com.jybl.admin.service;

import com.jybl.admin.entity.OrderEntity;
import com.jybl.admin.service.provider.OrderProvider;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

@Mapper
public interface OrderMapper {

    @Select("SELECT COUNT(*) FROM PURCHASED_SERVICE")
    Integer getCount();

    @SelectProvider(type = OrderProvider.class, method = "selectOrder")
    List<OrderEntity> findAll(OrderEntity orderEntity, Long first, Long limit);

    @Select("SELECT COUNT(*) FROM PURCHASED_SERVICE WHERE WECHAT_ID = #{wechat_id}")
    Integer getCountByWechatId(@Param("wechat_id") String wechat_id);

    @Select("SELECT * FROM PURCHASED_SERVICE WHERE WECHAT_ID = #{wechat_id} LIMIT #{first}, #{limit}")
    List<OrderEntity> findByWechatId(@Param("wechat_id") String wechat_id, @Param("first") Long first, @Param("limit") Long limit);

}
