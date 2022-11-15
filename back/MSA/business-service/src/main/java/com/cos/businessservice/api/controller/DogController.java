package com.cos.businessservice.api.controller;


import com.cos.businessservice.DB.entity.Dog;
import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.api.request.dogPostRequest;
import com.cos.businessservice.api.response.dogPostResponse;
import com.cos.businessservice.api.service.DogService;
import com.cos.businessservice.api.service.UserService;
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


@Api(value = "dog API" , tags = {"dog"})
@Slf4j
@RestController
@RequestMapping("/dog")
public class DogController {

    @Autowired
    UserService userService;

    @Autowired
    DogService dogService;

    @PostMapping()
    @ApiOperation(value = "강아지 등록하기",notes = "ntf 발행된 해쉬와 사진 주소로 강아지 등록",response = dogPostResponse.class)
    public ResponseEntity<?> registerDog(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication
            , @RequestBody dogPostRequest dog){
        try {

            User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));


            log.info("userId : {} ", user.getUserId());
            dogPostResponse dogRes = dogPostResponse.of(dogService.registerDog(dog,user));

            return ResponseEntity.status(HttpStatus.OK).body(dogRes);


        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @GetMapping("")
    @ApiOperation(value = "등록된 강아지 확인하기",notes = "본인 강아지 확인하기",response = dogPostResponse.class)
    public ResponseEntity<?> getDogList(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication
    ){
        try {
            User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));


            if (user == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BaseResponseBody.of(400, "유저 없음"));
            }

            List<Dog> dogList = dogService.findDogByUserId(user);

            List<dogPostResponse> dogResList = new ArrayList<>();
            for(Dog d : dogList){
                dogPostResponse dogRes = dogPostResponse.of(d);
                dogResList.add(dogRes);
            }

            if(dogResList.size() == 0){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(204, "데이터 없음"));
            }else{
                return ResponseEntity.status(HttpStatus.OK).body(dogResList);
            }

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @PatchMapping("/{dogPk}")
    @ApiOperation(value = "강아지 숨김 설정/해제",notes = "한번 호출 시마다 isHide가 true/false 변경")
    public ResponseEntity<? extends BaseResponseBody> changeHide(@PathVariable int dogPk){
        try {

            Dog dog = dogService.getByDogPk(dogPk);

            if (dog == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BaseResponseBody.of(400, "강아지 없음"));
            }

            dogService.updateByHide(dog);

            return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "변경 완료"));

        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @GetMapping("/{dogPk}")
    @ApiOperation(value = "강아지 단건 조회",notes = "")
    public ResponseEntity<?> getDog(@PathVariable int dogPk){
        try {

            Dog dog = dogService.getByDogPk(dogPk);

            if (dog == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BaseResponseBody.of(400, "강아지 없음"));
            }
            return ResponseEntity.status(HttpStatus.OK).body(dogPostResponse.of(dog));

        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @PostMapping("/list")
    @ApiOperation(value = "강아지 여러개 리스트 조회",notes = "")
    public ResponseEntity<?> getDog(@RequestBody List<Integer> dogPk){
        try {

            List<dogPostResponse> dogs = new ArrayList<>();

            for(int pk : dogPk) {
                dogs.add(dogPostResponse.of(dogService.getByDogPk(pk)));
            }

            return ResponseEntity.status(HttpStatus.OK).body(dogs);

        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }


}
