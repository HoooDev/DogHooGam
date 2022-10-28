package com.c103.dog.api.service;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.repository.DogRepository;
import com.c103.dog.api.request.dogPostRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DogServiceImpl implements DogService{

    @Autowired
    DogRepository dogRepository;

    @Override
    public Dog registerDog(dogPostRequest dog, User user) throws IllegalArgumentException {
        Dog dogEntity = Dog.builder()
                .transactionHash(dog.getTransactionHash())
                .dogImg(dog.getDogImg())
                .dogName(dog.getDogName())
                .dogBreed(dog.getDogBreed())
                .birthday(dog.getBirthday())
                .dogCharacter(dog.getDogCharacter())
                .isHide(false)
                .user(user)
                .build();
        return dogRepository.save(dogEntity);
    }

    @Override
    public List<Dog> findDogByUserId(User user) {
        return dogRepository.findByUser(user);
    }

    @Override
    public Dog getByDogPk(int dogPk) {
        return dogRepository.getById(dogPk);
    }

    @Override
    public void updateByHide(Dog dog) {
        if (dog.isHide()){
            dog.setHide(false);
        }else{
            dog.setHide(true);
        }

        dogRepository.save(dog);
    }
}
