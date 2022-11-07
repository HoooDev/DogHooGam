package com.c103.dog.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.List;

@Getter
@ApiModel(value = "WalkRequest",description = "산책 시작 요청")
public class PersonRequest {
    @ApiModelProperty(name="dogPk", value = "List로 여러 마리 개 pk")
    private List<Integer> dogPk;

    @ApiModelProperty(name="위도", example="127.01")
    private double lat;

    @ApiModelProperty(name="경도", example="64.01")
    private double lng;

    @ApiModelProperty(name="개 상태", example="0" , value = "0, 1, 2 등등")
    private int dogState;



}
