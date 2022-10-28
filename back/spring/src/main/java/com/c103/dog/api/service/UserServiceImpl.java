package com.c103.dog.api.service;

import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User getUserByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public User registerAddress(User user, String userWallerAddress) {
        user.setWalletAddress(userWallerAddress);
        return userRepository.save(user);
    }

}
