package com.c103.dog.api.service;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.Walk;
import com.c103.dog.DB.entity.redis.Person;
import com.c103.dog.DB.repository.DogRepository;
import com.c103.dog.DB.repository.WalkRepository;
import com.c103.dog.DB.repository.redis.PersonRedisRepository;
import com.c103.dog.api.request.PersonEndRequest;
import com.c103.dog.api.request.PersonRequest;
import com.c103.dog.api.request.PersonWalkingRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@Slf4j
public class WalkServiceImpl implements WalkService {

    private final double STD_LAT = 124;
    private final double STD_LNG = 33;

    @Autowired
    WalkRepository walkRepository;

    @Autowired
    DogRepository dogRepository;



    @Autowired
    PersonRedisRepository redisRepo;

    public LocalTime toTime(int time) {

        int hour = time/(60*60);
        int minute = time/60;
        int second = time%60;
        System.out.println(time +"초는 " + hour + "시간, " + minute + "분, " + second + "초입니다.");

        return LocalTime.of(hour,minute,second);
    }


//    @Override
//    public List<Person> walkingDogList(PersonRequest walkReq) {
//        String pk = Integer.toString(walkReq.getDogPk());
//        int lngArea = (int)((walkReq.getLng() - STD_LNG)*1000);
//        int latArea = (int)((walkReq.getLat() - STD_LAT)*1000);
//
//        Person p = redisRepo.findById(pk).orElse(null);
//        LocalDateTime createdAt = LocalDateTime.now();
//        if(p == null){
//            p = Person.builder()
//                    .id(pk)
//                    .lng(walkReq.getLng())
//                    .lat(walkReq.getLat())
//                    .dogState(walkReq.getDogState())
//                    .build();
//        }else{
//            createdAt = p.getCreatedAt();
//            redisRepo.deleteById(pk);
//        }
//
//        List<Person> personList = redisRepo.findAll();
//        p.setCreatedAt(createdAt);
//        p.setLatArea(latArea);
//        p.setLngArea(lngArea);
//        redisRepo.save(p);
//
//        List<Person> check = new ArrayList<>();
//
//        for(Person std : personList){
//            if(Math.abs(std.getLatArea() - latArea) > 1 || Math.abs(std.getLngArea() - lngArea) > 1 ) continue;
//            check.add(std);
//        }
//
//        return check;
//    }


    @Override
    public String startWalking(PersonRequest personReq) {
        int lngArea = (int)((personReq.getLng() - STD_LNG)*1000);
        int latArea = (int)((personReq.getLat() - STD_LAT)*1000);

        Person p = new Person();
        p.setDogPk(personReq.getDogPk());
        p.setLng(personReq.getLng());
        p.setLat(personReq.getLat());
        p.setDogState(personReq.getDogState());
        p.setLatArea(latArea);
        p.setLngArea(lngArea);

        log.info(p.toString());

        String id = redisRepo.save(p).getId();

        log.info(id);
        return id;




    }

    @Override
    public List<Person> walkingDogList(PersonWalkingRequest personWalkingReq) {


        String pk = personWalkingReq.getPersonId();
        int lngArea = (int)((personWalkingReq.getLng() - STD_LNG)*1000);
        int latArea = (int)((personWalkingReq.getLat() - STD_LAT)*1000);
        Person p = redisRepo.findById(pk).orElse(new Person());
        p.setId(pk);
        p.setLng(personWalkingReq.getLng());
        p.setLat(personWalkingReq.getLat());
        p.setLngArea(lngArea);
        p.setLatArea(latArea);
        redisRepo.deleteById(pk);
        List<Person> personList = redisRepo.findAll();

        redisRepo.save(p);


//        List<Person> check = new ArrayList<>();
//
//        if(personList != null){
//
//            for(Person std : personList) {
//                if (std == null || Math.abs(std.getLatArea() - latArea) > 1 || Math.abs(std.getLngArea() - lngArea) > 1) continue;
//                check.add(std);
//            }
//        }
//        log.info("4");
//
//        log.info("종료");
//        return check;

        return personList;

    }

    @Override
    public boolean endWalking(PersonEndRequest walkReq) {
        log.info("체크");
        Person p = redisRepo.findById(walkReq.getPersonId()).orElse(null);
        log.info(p.toString());
        redisRepo.deleteById(walkReq.getPersonId());

        if(p ==  null){
            return false;
        }


        Walk walk = new Walk();
        walk.setWalkPath(walkReq.lineToString());
        walk.setCoin(walkReq.getCoin());
        walk.setDistance(walkReq.getDistance());


        List<Dog> dogList = dogRepository.findAllById(p.getDogPk());

        for(Dog dog : dogList){
            walk.setDog(dog);
            walkRepository.save(walk);
        }
        return true;
    }

    @Override
    public Walk getByWalkPk(int walkPk) {
        return walkRepository.getById(walkPk);
    }

    @Override
    public List<Walk> findWalkByDay(int dogPk, String year, String month) {
        return walkRepository.findWalkByDay(dogPk, year, month);
    }
}
