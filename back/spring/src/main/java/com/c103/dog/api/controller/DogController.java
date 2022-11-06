package com.c103.dog.api.controller;


import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.repository.UserRepository;
import com.c103.dog.api.request.dogPostRequest;
import com.c103.dog.api.response.dogPostResponse;
import com.c103.dog.api.service.DogService;
import com.c103.dog.api.service.UserService;
import com.c103.dog.common.auth.SsafyUserDetails;
import com.c103.dog.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;


@Api(value = "dog API" , tags = {"dog"})
@Slf4j
@RestController
@RequestMapping("/api/dog")
public class DogController {

    @Autowired
    UserService userService;

    @Autowired
    DogService dogService;

    @PostMapping()
    @ApiOperation(value = "강아지 등록하기",notes = "ntf 발행된 해쉬와 사진 주소로 강아지 등록",response = dogPostResponse.class)
    public ResponseEntity<?> registerDog(@ApiIgnore Authentication authentication, @RequestBody dogPostRequest dog){
        try {

            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            User user = userService.getUserByUserId(userDetails.getUsername());

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
    public ResponseEntity<?> getDogList(@ApiIgnore Authentication authentication){
        try {
            log.info("getDogList");
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            log.info("userDetails : {} " , userDetails.getUsername());
            User user = userService.getUserByUserId(userDetails.getUsername());
            log.info("userId : {} " , user.getUserId());

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
