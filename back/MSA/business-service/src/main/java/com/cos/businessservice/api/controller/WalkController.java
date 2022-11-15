package com.cos.businessservice.api.controller;


import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.DB.entity.Walk;
import com.cos.businessservice.DB.entity.redis.Person;
import com.cos.businessservice.api.request.PersonEndRequest;
import com.cos.businessservice.api.request.PersonRequest;
import com.cos.businessservice.api.request.PersonWalkingRequest;
import com.cos.businessservice.api.response.PersonResponse;
import com.cos.businessservice.api.response.WalkResponse;
import com.cos.businessservice.api.service.UserService;
import com.cos.businessservice.api.service.WalkService;
import com.cos.businessservice.common.response.BaseResponseBody;
import com.cos.businessservice.common.util.JwtTokenUtil;
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
@RequestMapping("/walk")
public class WalkController {

    @Autowired
    WalkService walkService;

    @Autowired
    UserService userService;


    @PostMapping("")
    @ApiOperation(value = "산책 시작",notes = "강아지 여러마리 선택가능, 자기 ID 반환")
    public ResponseEntity<?> startWalk(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication,@RequestBody PersonRequest personReq){

        log.info("api 실행(info)");
        log.debug("api 실행(debug)");
        log.info(personReq.toString());

        try {


            User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));
            String personId = walkService.startWalking(personReq, user);

            return ResponseEntity.status(HttpStatus.OK).body(personId);

        }catch (IllegalArgumentException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            log.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @PostMapping("/walking")
    @ApiOperation(value = "산책 중",notes = "산책 시작 api에서 받은 id 값으로 자기 위치 갱신 후 주변 강아지 좌표 봔환")
    public ResponseEntity<?> walkingDog(@RequestBody PersonWalkingRequest personWalkingReq){
        try {
            log.info("산책 중 시작");


            List<Person> personList = walkService.walkingDogList(personWalkingReq);

            List<PersonResponse> personResList = new ArrayList<>();
            for (Person p : personList) {
                personResList.add(PersonResponse.of(p));
            }
            return ResponseEntity.status(HttpStatus.OK).body(personResList);
        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            log.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }




    @PostMapping("/end")
    @ApiOperation(value = "산책 종료",notes = "자기 위치 삭제 후 산책 기록 저장")
    public ResponseEntity<?> walkingEndDog(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication,  @RequestBody PersonEndRequest walkReq){
        log.info("산책 종료 실행");
        try {

            User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));
            if(walkService.endWalking(walkReq,user)){
                return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "산책 종료 저장 성공"));
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BaseResponseBody.of(400, "저장 실패"));
            }

        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }


    @GetMapping("/{walkPk}")
    @ApiOperation(value = "산책 상세 보기",notes = "단건 조회",response = WalkResponse.class)
    public ResponseEntity<?> getWalk(@PathVariable int walkPk){
        try {

            Walk walk = walkService.getByWalkPk(walkPk);

            return ResponseEntity.status(HttpStatus.OK).body(WalkResponse.of(walk));


        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }











}
