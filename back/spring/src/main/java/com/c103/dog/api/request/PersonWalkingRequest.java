package com.c103.dog.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.List;

@Getter
@ApiModel(value = "PersonWalkingRequest",description = "산책 중 강아지 위치 요청")
public class PersonWalkingRequest {
    @ApiModelProperty(name="산책Pk", example="dsffefef")
    private String personId;

    @ApiModelProperty(name="위도", example="127.01")
    private double lat;

    @ApiModelProperty(name="경도", example="64.01")
    private double lng;

}
