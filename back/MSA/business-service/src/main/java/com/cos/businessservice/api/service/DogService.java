package com.cos.businessservice.api.service;


import com.cos.businessservice.DB.entity.Dog;
import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.api.request.dogPostRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DogService {
    Dog registerDog(dogPostRequest dog, User user, MultipartFile file) throws IOException;

    List<Dog> findDogByUserId(User user);

    Dog getByDogPk(int dogPk);

    void updateByHide(Dog dog);
}
