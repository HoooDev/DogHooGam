package com.cos.businessservice.api.controller;


import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.api.service.UserService;
import com.cos.businessservice.common.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Api(value = "test API" , tags = {"test"})
@Slf4j
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    UserService userService;
    @GetMapping("")
    @ApiOperation(value = "연결 확인",notes = "")
    public String connect(){

        return "business connect";
    }


    @GetMapping("/header")
    @ApiOperation(value = "연결 확인",notes = "")
    public String header(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication){
        User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));
        return user.getUserId();
    }
}
