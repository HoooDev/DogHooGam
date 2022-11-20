package com.c103.dog.api.controller;


import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.repository.UserRepository;
import com.c103.dog.api.request.UserAddressRequest;
import com.c103.dog.api.request.dogPostRequest;
import com.c103.dog.api.response.UserAddressResponse;
import com.c103.dog.api.response.UserResponse;
import com.c103.dog.api.response.dogPostResponse;
import com.c103.dog.api.service.UserService;
import com.c103.dog.common.auth.SsafyUserDetails;
import com.c103.dog.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


@Api(value = "user API" , tags = {"user"})
@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping()
    @ApiOperation(value = "로그인 유저 정보 보기",notes = "지갑 주소나 강아지 정보같은 경우는 따로 api 호출",response = UserResponse.class)
    public ResponseEntity<?> getUser(@ApiIgnore Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userService.getUserByUserId(userDetails.getUsername());

        UserResponse userRes = UserResponse.builder()
                .userId(user.getUserId())
                .userPk(user.getPk())
                .userWalletAddress(user.getWalletAddress())
                .nickName(user.getNickName())
                .profileImg(user.getProfileImg())
                .role(user.getRole())
                .build();

        return ResponseEntity.status(200).body(userRes);
    }

    @GetMapping("/wallet")
    @ApiOperation(value = "로그인 유저 지갑 주소 읽기",notes = "",response = UserAddressResponse.class)
    public ResponseEntity<?> getWalletAddress(@ApiIgnore Authentication authentication){

        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userService.getUserByUserId(userDetails.getUsername());

        UserAddressResponse userAddressRes = UserAddressResponse.builder()
                .userPk(user.getPk())
                .userPersonalKey(user.getPersonalKey())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(userAddressRes);
    }

    @PostMapping("/wallet")
    @ApiOperation(value = "로그인 유저 지갑 주소 등록",notes = "" ,response = UserAddressResponse.class)
    public ResponseEntity<?> registerWalletAddress(@ApiIgnore Authentication authentication,@RequestBody UserAddressRequest userAdd){

        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userService.getUserByUserId(userDetails.getUsername());


        User userEntity = userService.registerAddress(user,userAdd);

        UserAddressResponse userAddressRes = UserAddressResponse.builder()
                .userPk(user.getPk())
                .userPersonalKey(user.getPersonalKey())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(userAddressRes);
    }

}
