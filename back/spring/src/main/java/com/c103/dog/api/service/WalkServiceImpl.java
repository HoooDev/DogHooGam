package com.c103.dog.api.service;

import com.c103.dog.DB.entity.redis.Person;
import com.c103.dog.DB.repository.WalkRepository;
import com.c103.dog.DB.repository.redis.PersonRedisRepository;
import com.c103.dog.api.request.PersonRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class WalkServiceImpl implements WalkService {

    private final double STD_LAT = 124;
    private final double STD_LNG = 33;

    @Autowired
    WalkRepository walkRepository;

    @Autowired
    PersonRedisRepository redisRepo;

    public LocalTime toTime(int time) {

        int hour = time/(60*60);
        int minute = time/60;
        int second = time%60;
        System.out.println(time +"초는 " + hour + "시간, " + minute + "분, " + second + "초입니다.");

        return LocalTime.of(hour,minute,second);
    }


    @Override
    public List<Person> walkingDogList(PersonRequest walkReq) {
        String pk = Integer.toString(walkReq.getDogPk());
        int lngArea = (int)((walkReq.getLng() - STD_LNG)*1000);
        int latArea = (int)((walkReq.getLat() - STD_LAT)*1000);

        Person p = redisRepo.findById(pk).orElse(null);
        LocalDateTime createdAt = LocalDateTime.now();
        if(p == null){
            p = Person.builder()
                    .id(pk)
                    .lng(walkReq.getLng())
                    .lat(walkReq.getLat())
                    .dogState(walkReq.getDogState())
                    .build();
        }else{
            createdAt = p.getCreatedAt();
            redisRepo.deleteById(pk);
        }

        List<Person> personList = redisRepo.findAll();
        p.setCreatedAt(createdAt);
        p.setLatArea(latArea);
        p.setLngArea(lngArea);
        redisRepo.save(p);

        List<Person> check = new ArrayList<>();

        for(Person std : personList){
            if(Math.abs(std.getLatArea() - latArea) > 1 || Math.abs(std.getLngArea() - lngArea) > 1 ) continue;
            check.add(std);
        }

        return check;
    }

    public List<Person> walkingEndDogList(PersonRequest walkReq) {
        String pk = Integer.toString(walkReq.getDogPk());
        Person p = redisRepo.findById(pk).orElse(null);

        Duration duration = Duration.between(p.getCreatedAt(), LocalDateTime.now());
        LocalTime time = toTime((int)duration.getSeconds());




        return null;
    }
}
