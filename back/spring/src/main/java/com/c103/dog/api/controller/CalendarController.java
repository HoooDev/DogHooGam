package com.c103.dog.api.controller;

import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.Memo;
import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.entity.Walk;
import com.c103.dog.api.response.FeedPostResponse;
import com.c103.dog.api.response.MemoResponse;
import com.c103.dog.api.response.WalkResponse;
import com.c103.dog.api.service.FeedService;
import com.c103.dog.api.service.MemoService;
import com.c103.dog.api.service.UserService;
import com.c103.dog.api.service.WalkService;
import com.c103.dog.common.auth.SsafyUserDetails;
import com.c103.dog.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Api(value = "Calendar API" , tags = {"Calendar"})
@Slf4j
@RestController
@RequestMapping("/api/calendar")
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
    public ResponseEntity<?> getCalenderFeedList(@ApiIgnore Authentication authentication, @RequestParam String year, @RequestParam String month){
        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            User user = userService.getUserByUserId(userDetails.getUsername());

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
    public ResponseEntity<?> getCalenderMemoList(@ApiIgnore Authentication authentication, @RequestParam String year, @RequestParam String month){
        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            User user = userService.getUserByUserId(userDetails.getUsername());


            List<Memo> memoList = memoService.findMemoByDay(user,year,month);
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
    public ResponseEntity<?> getCalenderWalkList(@ApiIgnore Authentication authentication, @RequestParam String year, @RequestParam String month, @RequestParam int dogPk){
        try {

            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            User user = userService.getUserByUserId(userDetails.getUsername());


            List<Walk> memoList = walkService.findWalkByDay(user,year,month);

            List<WalkResponse> walkResList = new ArrayList<>();
            for(Walk w : memoList){
                WalkResponse walkRes = WalkResponse.of(w);
                walkResList.add(walkRes);
            }

            if(walkResList.size() == 0){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(204, "데이터 없음"));
            }else{
                return ResponseEntity.status(HttpStatus.OK).body(walkResList);
            }
        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }


}
