package com.jybl.admin.dao;

import com.jybl.admin.entity.Suggestion;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SuggestionMapper {

    @Select("SELECT COUNT(*) FROM SUGGESTION")
    Integer selectCount();

    @Select("SELECT * FROM SUGGESTION LIMIT #{first}, #{limit}")
    List<Suggestion> selectSuggestions(@Param("first") Integer first, @Param("limit") Integer limit);

}
