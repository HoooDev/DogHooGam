package com.cos.businessservice.DB.repository;


import com.cos.businessservice.DB.entity.Dog;
import com.cos.businessservice.DB.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DogRepository extends JpaRepository<Dog, Integer> {
    List<Dog> findByUser(User user);
}
