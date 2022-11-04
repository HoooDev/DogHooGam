package com.c103.dog.api.controller;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.User;
import com.c103.dog.api.request.FeedPostRequest;
import com.c103.dog.api.request.dogPostRequest;
import com.c103.dog.api.response.FeedPostResponse;
import com.c103.dog.api.response.dogPostResponse;
import com.c103.dog.api.service.FeedService;
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

import java.util.ArrayList;
import java.util.List;

@Api(value = "feed API" , tags = {"feed"})
@Slf4j
@RestController
@RequestMapping("/api/feed")
public class FeedController {

    @Autowired
    UserService userService;

    @Autowired
    FeedService feedService;

    @PostMapping("")
    @ApiOperation(value = "피드 등록하기",notes = "ntf 발행된 해쉬와 사진 주소로  강아지별 피드 등록,",response = FeedPostResponse.class)
    public ResponseEntity<?> registerFeed(@ApiIgnore Authentication authentication, @RequestBody FeedPostRequest feedReq){
        try {

            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            User user = userService.getUserByUserId(userDetails.getUsername());

            log.info("userId : {} ", user.getUserId());

            FeedPostResponse feedRes = FeedPostResponse.of(feedService.registerFeed(feedReq, user));
            return ResponseEntity.status(HttpStatus.OK).body(feedRes);
        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @PatchMapping("/{feedPk}")
    @ApiOperation(value = "피드 숨김 설정/해제",notes = "한번 호출 시마다 isHide가 true/false 변경")
    public ResponseEntity<? extends BaseResponseBody> changeHide(@PathVariable int feedPk){
        try {

            Feed feed = feedService.getByFeedPk(feedPk);

            if (feed == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BaseResponseBody.of(400, "피드 없음"));
            }

            feedService.updateByHide(feed);

            return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "변경 완료"));

        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }



    @GetMapping("")
    @ApiOperation(value = "강아지 사진 모두 보기",notes = "본인 강아지 피드 확인하기",response = FeedPostResponse.class)
    public ResponseEntity<?> getFeedList(@ApiIgnore Authentication authentication){
        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            User user = userService.getUserByUserId(userDetails.getUsername());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BaseResponseBody.of(400, "유저 없음"));
            }
            List<Feed> feedList = feedService.findFeedByUser(user);

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


    @GetMapping("/{feedPk}")
    @ApiOperation(value = "강아지 사진 상세 보기",notes = "단건 조회",response = FeedPostResponse.class)
    public ResponseEntity<?> getFeed(@PathVariable int feedPk){
        try {

            Feed feed = feedService.getByFeedPk(feedPk);

            return ResponseEntity.status(HttpStatus.OK).body(FeedPostResponse.of(feed));


        }catch (IllegalArgumentException e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "올바르지 않은 인수 전달"));
        }catch (Exception e){
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }
}
