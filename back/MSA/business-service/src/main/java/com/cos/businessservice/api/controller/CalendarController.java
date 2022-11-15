package com.cos.businessservice.api.controller;


import com.cos.businessservice.DB.entity.Feed;
import com.cos.businessservice.DB.entity.Memo;
import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.DB.entity.Walk;
import com.cos.businessservice.api.response.FeedPostResponse;
import com.cos.businessservice.api.response.MemoResponse;
import com.cos.businessservice.api.response.WalkResponse;
import com.cos.businessservice.api.service.FeedService;
import com.cos.businessservice.api.service.MemoService;
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


@Api(value = "Calendar API" , tags = {"Calendar"})
@Slf4j
@RestController
@RequestMapping("/calendar")
public class CalendarController {
    @Autowired
    UserService userService;

    @Autowired
    FeedService feedService;

    @Autowired
    MemoService memoService;

    @Autowired
    WalkService walkService;

    @GetMapping("/feed")
    @ApiOperation(value = "캘린더 피드 리스트 읽기",notes = "년도, 달별에 포함되는 한달씩만 출력",response = FeedPostResponse.class)
    public ResponseEntity<?> getCalenderFeedList(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication
            , @RequestParam String year, @RequestParam String month){
        try {
            User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));


            List<Feed> feedList = feedService.findFeedByDay(user,year,month);

            List<FeedPostResponse> feedResList = new ArrayList<>();
            for(Feed f : feedList){
                FeedPostResponse feedRes = FeedPostResponse.of(f);
                feedResList.add(feedRes);
            }

            if(feedResList.size() == 0){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(204, "데이터 없음"));
            }else{
                return ResponseEntity.status(HttpStatus.OK).body(feedResList);
            }
        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }



    @GetMapping("/memo")
    @ApiOperation(value = "캘린더 메모 리스트 읽기",notes = "년도, 달별에 포함되는 한달씩만 출력",response = MemoResponse.class)
    public ResponseEntity<?> getCalenderMemoList(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication
            , @RequestParam String year, @RequestParam String month){
        try {
            User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));



            List<Memo> memoList = memoService.findMemoByMonth(user,year,month);
            List<List<MemoResponse>> memoResList = new ArrayList<>();

            for(int i = 0 ; i <= 31 ; i++){
                memoResList.add(new ArrayList<>());
            }
            for(Memo m : memoList){
                MemoResponse memoRes = MemoResponse.of(m);
                memoResList.get(m.getMemoDate().toLocalDateTime().getDayOfMonth()).add(memoRes);
            }

//            List<MemoResponse> memoResList = new ArrayList<>();
//            for(Memo m : memoList){
//                MemoResponse feedRes = MemoResponse.of(m);
//                memoResList.add(feedRes);
//            }

            if(memoResList.size() == 0){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(204, "데이터 없음"));
            }else{
                return ResponseEntity.status(HttpStatus.OK).body(memoResList);
            }
        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }


    @GetMapping("/walk")
    @ApiOperation(value = "캘린더 산책 리스트 읽기",notes = "강아지 별 년도, 달별에 포함되는 한달씩만 출력",response = WalkResponse.class)
    public ResponseEntity<?> getCalenderWalkList(@RequestHeader(JwtTokenUtil.HEADER_STRING) String authentication
            , @RequestParam String year, @RequestParam String month){
        try {

            User user = userService.getUserByUserId(JwtTokenUtil.getUserId(authentication));



//            List<Walk> memoList = walkService.findWalkByDay(user,year,month);
//
//            List<WalkResponse> walkResList = new ArrayList<>();
//            for(Walk w : memoList){
//                WalkResponse walkRes = WalkResponse.of(w);
//                walkResList.add(walkRes);
//            }


            List<Walk> walkList = walkService.findWalkByDay(user,year,month);
            List<List<WalkResponse>> walkResList = new ArrayList<>();

            for(int i = 0 ; i <= 31 ; i++){
                walkResList.add(new ArrayList<>());
            }
            for(Walk m : walkList){
                WalkResponse walkRes = WalkResponse.of(m);
                walkResList.get(m.getCreateDate().toLocalDateTime().getDayOfMonth()).add(walkRes);
            }


            if(walkResList.size() == 0){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(204, "데이터 없음"));
            }else{
                return ResponseEntity.status(HttpStatus.OK).body(walkResList);
            }
        }catch (IllegalArgumentException e) {
            for(StackTraceElement a : e.getStackTrace()){
                log.info(a.toString());
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            for(StackTraceElement a : e.getStackTrace()){
                log.info(a.toString());
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

}
