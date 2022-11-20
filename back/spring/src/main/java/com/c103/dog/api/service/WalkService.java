package com.c103.dog.api.service;

import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.entity.Walk;
import com.c103.dog.DB.entity.redis.Person;
import com.c103.dog.api.request.PersonEndRequest;
import com.c103.dog.api.request.PersonRequest;
import com.c103.dog.api.request.PersonWalkingRequest;

import java.util.List;


public interface WalkService {
    

    String startWalking(PersonRequest personReq,User user);

    List<Person> walkingDogList(PersonWalkingRequest personWalkingReq);

    boolean endWalking(PersonEndRequest walkReq, User user);

    Walk getByWalkPk(int walkPk);

    List<Walk> findWalkByDay(User user, String year, String month);
}
