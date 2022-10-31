package com.c103.dog.api.controller;


import com.c103.dog.DB.entity.redis.Person;
import com.c103.dog.api.request.PersonRequest;
import com.c103.dog.api.response.PersonResponse;
import com.c103.dog.api.service.WalkService;
import com.c103.dog.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(value = "walk API" , tags = {"walk"})
@Slf4j
@RestController
@RequestMapping("/api/walk")
public class WalkController {

    @Autowired
    WalkService walkService;


    @PostMapping("")
    @ApiOperation(value = "산책 시작, 하는 중",notes = "자기 제외 다른 강아지 위치 반환,")
    public ResponseEntity<?> walkingDog(@RequestBody PersonRequest personReq){
        try {
            List<Person> personList = walkService.walkingDogList(personReq);

            List<PersonResponse> personResList = new ArrayList<>();
            for (Person p : personList) {
                personResList.add(PersonResponse.of(p));
            }

           if(personResList.size() == 0){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(204, "데이터 없음"));
            }else{
                return ResponseEntity.status(HttpStatus.OK).body(personResList);
            }

        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @PostMapping("/end")
    @ApiOperation(value = "산책 종료",notes = "자기 위치 삭제 후 산책 기록 저장")
    public ResponseEntity<?> walkingEndDog(@RequestBody PersonRequest walkReq){



        return null;
    }





}
