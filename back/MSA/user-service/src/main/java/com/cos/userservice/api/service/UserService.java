package com.cos.userservice.api.service;


import com.cos.userservice.DB.entity.User;
import com.cos.userservice.api.request.UserAddressRequest;

public interface UserService {
    User getUserByUserId(String userId) ;
    User registerAddress(User user, UserAddressRequest userAdd);
}
