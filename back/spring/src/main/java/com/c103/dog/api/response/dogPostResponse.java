package com.c103.dog.api.response;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.common.response.BaseResponseBody;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

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