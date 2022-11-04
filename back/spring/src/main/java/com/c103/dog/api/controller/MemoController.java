package com.c103.dog.api.controller;

import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.User;
import com.c103.dog.api.request.FeedPostRequest;
import com.c103.dog.api.request.MemoPostRequest;
import com.c103.dog.api.request.MemoUpdateRequest;
import com.c103.dog.api.response.FeedPostResponse;
import com.c103.dog.api.response.MemoResponse;
import com.c103.dog.api.service.MemoService;
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

@Api(value = "Memo API" , tags = {"Memo"})
@Slf4j
@RestController
@RequestMapping("/api/memo")
public class MemoController {

    @Autowired
    MemoService memoService;

    @Autowired
    UserService userService;

    @PostMapping("")
    @ApiOperation(value = "메모 등록하기",notes = "강아지 별 메모 등록,",response = MemoResponse.class)
    public ResponseEntity<?> registerMemo(@ApiIgnore Authentication authentication, @RequestBody MemoPostRequest memoReq){
        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            User user = userService.getUserByUserId(userDetails.getUsername());

            MemoResponse memoRes = MemoResponse.of(memoService.registerMemo(memoReq, user));
            return ResponseEntity.status(HttpStatus.OK).body(memoRes);
        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @GetMapping("/{memoPk}")
    @ApiOperation(value = "메모 상세 보기",notes = "단건 조회",response = MemoResponse.class)
    public ResponseEntity<?> getMemo(@PathVariable int memoPk){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(MemoResponse.of(memoService.getByMemoPk(memoPk)));
        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }


    @PatchMapping("")
    @ApiOperation(value = "메모 수정하기",notes = "메모 수정",response = MemoResponse.class)
    public ResponseEntity<?> updateMemo(@RequestBody MemoUpdateRequest memoUpdateReq){
        try {

            return ResponseEntity.status(HttpStatus.OK).body(MemoResponse.of(memoService.updateMemo(memoUpdateReq)));
        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @DeleteMapping("/{memoPk}")
    @ApiOperation(value = "메모 삭제하기",notes = "메모 수정")
    public ResponseEntity<?> updateMemo(@PathVariable int memoPk){
        try {
            memoService.deleteMemo(memoPk);
            return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "삭제 성공"));
        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }



}
