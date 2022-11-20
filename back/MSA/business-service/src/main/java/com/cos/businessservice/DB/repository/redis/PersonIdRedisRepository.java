package com.cos.businessservice.DB.repository.redis;


import com.cos.businessservice.DB.entity.redis.PersonId;
import org.springframework.data.repository.CrudRepository;

public interface PersonIdRedisRepository extends CrudRepository<PersonId, String> {


}
