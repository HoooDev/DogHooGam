package com.c103.dog.api.service;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.User;
import com.c103.dog.api.request.dogPostRequest;

import java.util.List;

public interface DogService {
    Dog registerDog(dogPostRequest dog, User user);

    List<Dog> findDogByUserId(User user);

    Dog getByDogPk(int dogPk);

    void updateByHide(Dog dog);
}
