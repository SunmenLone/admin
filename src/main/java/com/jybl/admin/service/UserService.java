package com.jybl.admin.service;

import com.jybl.admin.dao.UserMapper;
import com.jybl.admin.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    public User getByUsername(String username) {
        return userMapper.findByUsername(username);
    }

}
