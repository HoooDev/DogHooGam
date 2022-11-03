package com.c103.dog.api.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@ApiModel(value = "dogPostRequest",description = "강아지 신분증 등록 요청")
public class dogPostRequest {
    @ApiModelProperty(name="NFT 해쉬코드", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
    private String transactionHash;

    @ApiModelProperty(name="강아지 프로필 사진", example="IPFS://~~" , value = "NFT 발행 후 저장된 이미지 주소")
    private String dogImg;

    @ApiModelProperty(name="강아지 이름", example="멈멈미")
    private String dogName;

    @ApiModelProperty(name = "강아지 등록번호")
    private String dogNumber;

    @ApiModelProperty(name="강아지 생일", example="2022-10-31")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul", pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    @ApiModelProperty(name="강아지 품종", example="시고르자브종")
    private String dogBreed;

    @ApiModelProperty(name="강아지 성격", example="착함 등등")
    private String dogCharacter;
}
