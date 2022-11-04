package com.c103.dog.api.controller;

import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.repository.UserRepository;
import com.c103.dog.api.request.TestEndRequest;
import com.c103.dog.api.request.UserAddressRequest;
import com.c103.dog.api.response.MemoResponse;
import com.c103.dog.api.response.UserAddressResponse;
import com.c103.dog.api.response.UserResponse;
import com.c103.dog.common.auth.SsafyUserDetails;
import com.c103.dog.common.response.BaseResponseBody;
import com.c103.dog.common.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "test API" , tags = {"test"})
@Slf4j
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("")
    @ApiOperation(value = "연결 확인",notes = "")
    public ResponseEntity<?> connect(){

        return ResponseEntity.status(HttpStatus.OK).body("connect");
    }


    @PostMapping("/user")
    @ApiOperation(value = "test 유저 등록",notes = "userId 중복 안되게")
    public ResponseEntity<?> registerUser(@RequestParam String nickName , @RequestParam String userId ){

        User user = new User();

        user.setUserId(userId);
        user.setNickName(nickName);
        user.setRole("ROLE_USER");
        user.setProfileImg("http://k.kakaocdn.net/dn/bqjg8m/btrMUypIzty/3CEVtwLhBUZZFOCJosrgWK/img_640x640.jpg");

        User u = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(u);
    }


    @PostMapping("/token")
    @ApiOperation(value = "유저 아이디로 token 발급",notes = "헤드에 Authorization : Bearer + token")
    public ResponseEntity<?> getToken(@RequestParam String userId ){
        String token = JwtTokenUtil.getToken(userId);
        return ResponseEntity.status(HttpStatus.OK).body("Bearer "+token);
    }

    @PostMapping("/walk")
    @ApiOperation(value = "walk test",notes = "헤드에 Authorization : Bearer + token")
    public ResponseEntity<?> postWalk(@RequestBody TestEndRequest testEndRequest){

        System.out.println(testEndRequest.getWww().toString());
        return null;
    }
}
