package com.cos.businessservice.api.service;


import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.DB.repository.UserRepository;
import com.cos.businessservice.error.Exception.custom.SomethingNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User getUserByUserId(String userId) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new SomethingNotFoundException(userId + "를 찾을수 없습니다"));
        return user;
    }


}
