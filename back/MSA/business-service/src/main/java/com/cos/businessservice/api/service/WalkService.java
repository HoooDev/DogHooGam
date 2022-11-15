package com.cos.businessservice.api.service;


import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.DB.entity.Walk;
import com.cos.businessservice.DB.entity.redis.Person;
import com.cos.businessservice.api.request.PersonEndRequest;
import com.cos.businessservice.api.request.PersonRequest;
import com.cos.businessservice.api.request.PersonWalkingRequest;

import java.util.List;


public interface WalkService {
    

    String startWalking(PersonRequest personReq, User user);

    List<Person> walkingDogList(PersonWalkingRequest personWalkingReq);

    boolean endWalking(PersonEndRequest walkReq, User user);

    Walk getByWalkPk(int walkPk);

    List<Walk> findWalkByDay(User user, String year, String month);
}
