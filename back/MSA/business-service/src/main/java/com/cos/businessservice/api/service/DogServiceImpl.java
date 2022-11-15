package com.cos.businessservice.api.service;


import com.cos.businessservice.DB.entity.Dog;
import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.DB.repository.DogRepository;
import com.cos.businessservice.api.request.dogPostRequest;
import com.cos.businessservice.error.Exception.custom.SomethingNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class DogServiceImpl implements DogService{

    @Autowired
    DogRepository dogRepository;

    @Override
    public Dog registerDog(dogPostRequest dog, User user) throws IllegalArgumentException {
        Dog dogEntity = new Dog();

        dogEntity.setDogBreed(dog.getDogBreed());
        dogEntity.setDogImg(dog.getDogImg());
        dogEntity.setDogCharacter(dog.getDogCharacter());
        dogEntity.setDogName(dog.getDogName());
        dogEntity.setHide(false);
        dogEntity.setUser(user);
        dogEntity.setTransactionHash(dog.getTransactionHash());
        dogEntity.setBirthday(Timestamp.valueOf(dog.getBirthday().atStartOfDay()));
        dogEntity.setDogNumber(dog.getDogNumber());

        return dogRepository.save(dogEntity);
    }

    @Override
    public List<Dog> findDogByUserId(User user) {
        return dogRepository.findByUser(user);
    }

    @Override
    public Dog getByDogPk(int dogPk) {
        return dogRepository.findById(dogPk).orElseThrow(() -> new SomethingNotFoundException(dogPk + "를 찾을수 없습니다"));
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
