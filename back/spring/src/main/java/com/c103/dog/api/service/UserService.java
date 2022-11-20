package com.c103.dog.api.service;

import com.c103.dog.DB.entity.User;
import com.c103.dog.api.request.UserAddressRequest;


public interface UserService {
    User getUserByUserId(String userId) ;
    User registerAddress(User user, UserAddressRequest userAdd);
}
