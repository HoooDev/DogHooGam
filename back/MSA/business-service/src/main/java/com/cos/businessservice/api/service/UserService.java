package com.cos.businessservice.api.service;


import com.cos.businessservice.DB.entity.User;

public interface UserService {
    User getUserByUserId(String userId) ;
}
