package com.c103.dog.api.service;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.entity.Walk;
import com.c103.dog.DB.entity.redis.Person;
import com.c103.dog.DB.entity.redis.PersonId;
import com.c103.dog.DB.repository.DogRepository;
import com.c103.dog.DB.repository.WalkRepository;
import com.c103.dog.DB.repository.redis.PersonIdRedisRepository;
import com.c103.dog.DB.repository.redis.PersonRedisRepository;
import com.c103.dog.api.request.PersonEndRequest;
import com.c103.dog.api.request.PersonRequest;
import com.c103.dog.api.request.PersonWalkingRequest;
import com.c103.dog.error.Exception.custom.SomethingNotFoundException;
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

    @Autowired
    PersonIdRedisRepository personIdRedisRepository;

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
    public String startWalking(PersonRequest personReq,User user) {
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

        log.info("personId 저장 시작");
        log.info("userId : {} ", user.getUserId());
        PersonId personId = new PersonId();
        personId.setUserId(user.getUserId());
        personId.setPersonId(id);
        PersonId now = personIdRedisRepository.save(personId);
        log.info("PersonId : " + now.toString());

        log.info(id);
        return id;




    }

    @Override
    public List<Person> walkingDogList(PersonWalkingRequest personWalkingReq) {

        log.info("산책중");
        log.info("//////////////////////////////////////////////////////////////");
        log.info("//////////////////////////////////////////////////////////////");
        log.info("//////////////////////////////////////////////////////////////");
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

        Person save = redisRepo.save(p);
        List<Person> check = new ArrayList<>();

        if(personList != null){

            for(Person std : personList) {
                if (std == null) continue;
                check.add(std);
            }
        }

        log.info("본인 정보 : "  + save.toString());
        log.info("personList.size : " + check.size() );


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

        return check;

    }

    @Override
    public boolean endWalking(PersonEndRequest walkReq, User user) {
        log.info("체크");
        PersonId personId = personIdRedisRepository.findById(user.getUserId())
                .orElseThrow(() -> new SomethingNotFoundException(user.getUserId() + "의 산책 정보를 찾을 수 없음"));
        log.info("PersonId : " + personId.toString());

        personIdRedisRepository.deleteById(user.getUserId());

        log.info(walkReq.lineToString());

        Person p = redisRepo.findById(personId.getPersonId()).orElse(new Person());
        log.info(p.toString());
        redisRepo.deleteById(personId.getPersonId());

        if(p.getId() == null){
            return false;
        }


        Walk walk = new Walk();
        walk.setDogPkList(p.dogPktoString());
        walk.setWalkPath(walkReq.lineToString());
        walk.setCoin(walkReq.getCoin());
        walk.setDistance(walkReq.getDistance());
        walk.setUser(user);
        walkRepository.save(walk);


        return true;
    }

    @Override
    public Walk getByWalkPk(int walkPk) {
        return walkRepository.getById(walkPk);
    }

    @Override
    public List<Walk> findWalkByDay(User user, String year, String month) {
        return walkRepository.findWalkByDay(user.getPk(), year, month);
    }
}
