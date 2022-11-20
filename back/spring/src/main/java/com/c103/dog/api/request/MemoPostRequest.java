package com.c103.dog.api.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@ApiModel(value = "MemoPostRequest",description = "메모 등록 요청")
public class MemoPostRequest {

    private String content;

//    @ApiModelProperty(name="메모 저장 날짜", example="2022-10-31 11:28" , value = "year와 month,date로 분리해서 바꿔줄수 있음")
//    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
//    private LocalDateTime memoDate;
    @ApiModelProperty(name="저장 연도", example="2022")
    private int year;
    @ApiModelProperty(name="저장 월", example="01")
    private int month;
    @ApiModelProperty(name="저장 일", example="01")
    private int day;
}
