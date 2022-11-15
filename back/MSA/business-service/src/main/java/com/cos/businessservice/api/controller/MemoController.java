package com.cos.businessservice.api.controller;

import com.cos.businessservice.DB.entity.Memo;
import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.api.request.MemoPostRequest;
import com.cos.businessservice.api.request.MemoUpdateRequest;
import com.cos.businessservice.api.response.MemoResponse;
import com.cos.businessservice.api.service.MemoService;
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

@Api(value = "Memo API" , tags = {"Memo"})
@Slf4j
@RestController
@RequestMapping("/memo")
public class MemoController {

    @Autowired
    MemoService memoService;

    @Autowired
    UserService userService;

    @PostMapping("")
    @ApiOperation(value = "메모 등록하기",notes = "강아지 별 메모 등록,",response = MemoResponse.class)
    public ResponseEntity<?> registerMemo(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication, @RequestBody MemoPostRequest memoReq){
        try {
            User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));


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

    @PatchMapping("/{memoPk}")
    @ApiOperation(value = "메모 완료 바꾸기",notes = "true 면 false , false 면 true",response = BaseResponseBody.class)
    public ResponseEntity<?> changeDone(@PathVariable int memoPk){
        try {
            memoService.changeDone(memoPk);
            return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "변경 완료"));
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
    @GetMapping("/today")
    @ApiOperation(value = "오늘 메모 전부가져오기",notes = "오늘 날짜 메모만 전부 가져오기")
    public ResponseEntity<?> updateTodayMemo(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication){
        try {

            User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));


            List<Memo> memoList = memoService.findMemoByDay(user);
            List<MemoResponse> memoResList = new ArrayList<>();

            for(Memo m : memoList){
                MemoResponse memoRes = MemoResponse.of(m);
                memoResList.add(memoRes);
            }

            return ResponseEntity.status(HttpStatus.OK).body(memoResList);
        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }


}
