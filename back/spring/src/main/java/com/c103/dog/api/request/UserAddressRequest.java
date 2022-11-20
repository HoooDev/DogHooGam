package com.c103.dog.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel(value = "UserAddressRequest",description = "지갑 등록, jwt로 로그인 유저 확인")
public class UserAddressRequest {
    @ApiModelProperty(name="지갑 주소", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
    private String userWalletAddress;
    @ApiModelProperty(name="개인키", example="sdfsdfseyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
    private String userPersonalKey;

}
