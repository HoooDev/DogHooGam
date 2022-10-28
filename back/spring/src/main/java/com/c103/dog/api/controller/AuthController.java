package com.c103.dog.api.controller;


import com.c103.dog.api.request.dogPostRequest;
import com.c103.dog.common.auth.SsafyUserDetails;
import com.c103.dog.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;


@Api(value = "auth API" , tags = {"auth"})
@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {



    @GetMapping()
    public ResponseEntity<? extends BaseResponseBody> getUser(@ApiIgnore Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        log.info(userDetails.getUsername());


        return ResponseEntity.status(200).body(BaseResponseBody.of(200,userDetails.getUsername()));
    }
    @GetMapping("/1")
    public ResponseEntity<dogPostRequest> getdUser(@ApiIgnore Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        log.info(userDetails.getUsername());


        return null;
    }


}
