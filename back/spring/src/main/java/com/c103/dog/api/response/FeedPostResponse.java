package com.c103.dog.api.response;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.Feed;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

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
    private double lat;

    @ApiModelProperty(name="경도", example="64.01")
    private double lng;

    @ApiModelProperty(name="문구", example="문구입니다~")
    private String content;


    private boolean isHide;

    @ApiModelProperty(name="생성 날짜", example="yyyy-MM-dd HH:mm")
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp createDate;

    public static FeedPostResponse of(Feed feed){
        FeedPostResponse feedRes = FeedPostResponse.builder()
                .pk(feed.getPk())
                .transactionHash(feed.getTransactionHash())
                .feedImg(feed.getFeedImg())
                .lat(feed.getLat())
                .lng(feed.getLng())
                .content(feed.getContent())
                .isHide(feed.isHide())
                .createDate(feed.getCreateDate())
                .build();
        return feedRes;
    }
}