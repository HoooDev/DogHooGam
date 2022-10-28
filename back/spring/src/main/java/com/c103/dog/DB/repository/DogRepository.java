package com.c103.dog.DB.repository;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DogRepository extends JpaRepository<Dog, Integer> {
    List<Dog> findByUser(User user);
}
