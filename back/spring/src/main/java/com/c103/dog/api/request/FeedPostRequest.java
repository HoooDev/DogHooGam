package com.c103.dog.api.request;

import com.c103.dog.common.util.Position;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@ApiModel(value = "feedPostRequest",description = "강아지 신분증 등록 요청")
public class FeedPostRequest {
    @ApiModelProperty(name="dogPk", example="1" , dataType = "int")
    private List<Integer> dogPk;

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

    public String lineToString(){
        StringBuilder sb = new StringBuilder();
        for(int p : this.dogPk){
            System.out.println(p);
            sb.append(p).append(",");
        }
        return sb.toString();
    }
}
