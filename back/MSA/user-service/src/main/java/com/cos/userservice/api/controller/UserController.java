package com.cos.userservice.api.controller;


import com.cos.userservice.DB.entity.User;
import com.cos.userservice.api.request.UserAddressRequest;
import com.cos.userservice.api.response.UserAddressResponse;
import com.cos.userservice.api.response.UserResponse;
import com.cos.userservice.api.service.UserService;
import com.cos.userservice.common.auth.SsafyUserDetails;
import com.cos.userservice.common.util.JwtTokenUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }
    @GetMapping("test")
    public String test(){
        return "user connect";
    }

    @GetMapping()
    @ApiOperation(value = "로그인 유저 정보 보기",notes = "지갑 주소나 강아지 정보같은 경우는 따로 api 호출",response = UserResponse.class)
    public ResponseEntity<?> getUser(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication){
        User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));

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
    public ResponseEntity<?> getWalletAddress(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication){

        User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));

        UserAddressResponse userAddressRes = UserAddressResponse.builder()
                .userPk(user.getPk())
                .userPersonalKey(user.getPersonalKey())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(userAddressRes);
    }

    @PostMapping("/wallet")
    @ApiOperation(value = "로그인 유저 지갑 주소 등록",notes = "" ,response = UserAddressResponse.class)
    public ResponseEntity<?> registerWalletAddress(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication,@RequestBody UserAddressRequest userAdd){

        User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));


        User userEntity = userService.registerAddress(user,userAdd);

        UserAddressResponse userAddressRes = UserAddressResponse.builder()
                .userPk(user.getPk())
                .userPersonalKey(user.getPersonalKey())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(userAddressRes);
    }
}
