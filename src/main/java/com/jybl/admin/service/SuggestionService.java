package com.jybl.admin.service;

import com.jybl.admin.dao.SuggestionMapper;
import com.jybl.admin.entity.Suggestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuggestionService {

    @Autowired
    SuggestionMapper suggestionMapper;

    public Integer getSuggestionCount() {
        return suggestionMapper.selectCount();
    }

    public List<Suggestion> getSuggestions(Integer first, Integer limit) {
        List<Suggestion> list = suggestionMapper.selectSuggestions(first, limit);
        int i = 1;
        for (Suggestion s : list) {
            s.setId(i++);
            String datetime = s.getDatetime();
            s.setDatetime(datetime.substring(0, datetime.length()-2));
        }
        return list;
    }

}
