package com.c103.dog.api.service;

import com.c103.dog.DB.entity.User;
import org.springframework.stereotype.Service;


public interface UserService {
    User getUserByUserId(String userId);
}
