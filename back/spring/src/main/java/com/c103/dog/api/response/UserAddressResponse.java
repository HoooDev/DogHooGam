package com.c103.dog.api.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAddressResponse {

    private int userPk;


    @ApiModelProperty(name="개인키", example="sdfsdfseyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...", value = "보안을 위해서 클라이언트에 저장하지 않고 사용할때마다 호출")
    private String userPersonalKey;

}
