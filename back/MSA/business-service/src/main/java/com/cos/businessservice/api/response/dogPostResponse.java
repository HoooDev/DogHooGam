package com.cos.businessservice.api.response;


import com.cos.businessservice.DB.entity.Dog;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
@ApiModel(value = "dogPostResponse")
public class dogPostResponse {


    private int pk;

    @ApiModelProperty(name="NFT 해쉬코드", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
    private String transactionHash;


    @ApiModelProperty(name="강아지 프로필 사진", example="IPFS://~~" , value = "NFT 발행 후 저장된 이미지 주소")
    private String dogImg;

    @ApiModelProperty(name="강아지 이름", example="멈멈미")
    private String dogName;

    @ApiModelProperty(name="강아지 생일", example="yyyy-MM-dd")
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd")
    private Timestamp birthday;

    @ApiModelProperty(name="강아지 품종", example="시고르자브종")
    private String dogBreed;

    @ApiModelProperty(name="강아지 성격", example="착함 등등")
    private String dogCharacter;


    @ApiModelProperty(name="신분증 숨김 설정", example="false" , value = "기본 false 설정 true시에 안보임 설정")
    private boolean isHide;

    public static dogPostResponse of(Dog dog){
        dogPostResponse dogRes = dogPostResponse.builder()
                .transactionHash(dog.getTransactionHash())
                .dogImg(dog.getDogImg())
                .pk(dog.getPk())
                .dogName(dog.getDogName())
                .dogBreed(dog.getDogBreed())
                .birthday(dog.getBirthday())
                .dogCharacter(dog.getDogCharacter())
                .isHide(dog.isHide())
                .build();

        return dogRes;



    }
}