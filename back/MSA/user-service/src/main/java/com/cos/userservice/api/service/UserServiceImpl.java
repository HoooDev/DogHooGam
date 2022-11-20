package com.cos.userservice.api.service;

import com.cos.userservice.DB.entity.User;
import com.cos.userservice.DB.repository.UserRepository;
import com.cos.userservice.api.request.UserAddressRequest;
import com.cos.userservice.error.Exception.custom.SomethingNotFoundException;
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

    @Override
    public User registerAddress(User user, UserAddressRequest userAdd) {
        user.setWalletAddress(userAdd.getUserWalletAddress());
        user.setPersonalKey(userAdd.getUserPersonalKey());
        return userRepository.save(user);
    }

}
