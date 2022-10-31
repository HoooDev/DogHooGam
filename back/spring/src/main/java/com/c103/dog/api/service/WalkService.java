package com.c103.dog.api.service;

import com.c103.dog.DB.entity.redis.Person;
import com.c103.dog.api.request.PersonRequest;

import java.util.List;


public interface WalkService {

    List<Person> walkingDogList(PersonRequest walkReq);
}
