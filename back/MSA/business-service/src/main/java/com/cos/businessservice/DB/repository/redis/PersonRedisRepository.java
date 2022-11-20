package com.cos.businessservice.DB.repository.redis;

import com.cos.businessservice.DB.entity.redis.Person;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PersonRedisRepository extends CrudRepository<Person, String> {
    List<Person> findAll();
}
