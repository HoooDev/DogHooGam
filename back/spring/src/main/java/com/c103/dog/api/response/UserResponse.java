package com.c103.dog.api.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private int userPk;

    private String userId;

    private String nickName;

    private String userWalletAddress;

    private String profileImg;

    private String role;

}
