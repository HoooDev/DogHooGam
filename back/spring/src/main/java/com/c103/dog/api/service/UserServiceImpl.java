package com.c103.dog.api.service;

import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User getUserByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }
}
