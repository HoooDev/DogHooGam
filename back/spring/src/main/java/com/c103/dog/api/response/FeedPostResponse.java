package com.c103.dog.api.response;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.Feed;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
@ApiModel(value = "FeedPostResponse")
public class FeedPostResponse {

    private int pk;

    @ApiModelProperty(name="NFT 해쉬코드", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
    private String transactionHash;


    @ApiModelProperty(name="피드 사진", example="IPFS://~~" , value = "NFT 발행 후 저장된 이미지 주소")
    private String feedImg;

    @ApiModelProperty(name="위도", example="127.01")
    private long lat;

    @ApiModelProperty(name="경도", example="64.01")
    private long lng;

    @ApiModelProperty(name="문구", example="문구입니다~")
    private String content;

    private boolean isHide;

    public static FeedPostResponse of(Feed feed){
        FeedPostResponse feedRes = FeedPostResponse.builder()
                .pk(feed.getPk())
                .transactionHash(feed.getTransactionHash())
                .feedImg(feed.getFeedImg())
                .lat(feed.getLat())
                .lng(feed.getLng())
                .content(feed.getContent())
                .isHide(feed.isHide())
                .build();
        return feedRes;



    }
}