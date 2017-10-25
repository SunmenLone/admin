package com.jybl.admin.dao;

import com.jybl.admin.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM USER WHERE USERNAME=#{username}")
    User findByUsername(@Param("username") String username);

}
