package com.jybl.admin.controller;

import com.jybl.admin.service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/suggestion")
public class SuggestionController {

    @Autowired
    SuggestionService suggestionService;

    @RequestMapping("/listAll")
    public Map getSuggestions(HttpServletRequest request) {

        Integer first = 1, limit = 30;

        if (request.getParameter("page") != null && request.getParameter("limit") != null ) {
            limit = Integer.valueOf(request.getParameter("limit"));
            first = (Integer.valueOf(request.getParameter("page")) - 1) * limit;
        }

        Map map = new HashMap();
        map.put("code", 0);
        map.put("count", suggestionService.getSuggestionCount());
        map.put("data", suggestionService.getSuggestions(first, limit));

        return map;

    }

}
