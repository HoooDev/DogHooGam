package com.c103.dog.DB.repository.redis;

import com.c103.dog.DB.entity.redis.Person;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PersonRedisRepository extends CrudRepository<Person, String> {
    List<Person> findAll();
}
