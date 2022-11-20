package com.cos.userservice.error.Exception;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // Common
    OK(200, "OK"),
    INVALID_INPUT_VALUE(400,  "INVALID_INPUT_VALUE"),
    METHOD_NOT_ALLOWED(405, " Invalid Input Value"),
    ENTITY_NOT_FOUND(404, " Entity Not Found"),
    INTERNAL_SERVER_ERROR(500, "Server Error"),
    INVALID_TYPE_VALUE(400, " Invalid Type Value"),
    HANDLE_ACCESS_DENIED(403, "Access is Denied"),
    UNAUTHORIZED(401, "UnAuthorized"),
    SOME_VALUE_EMPTY(500,"Some value is empty"),

    //User
    EMAIL_DUPLICATION(409, "Email is Duplication"),
    AUTH_EMAIL_SEND_FAIL(500, "Auth Email Send Fail"),
    NICKNAME_DUPLICATION(409, "Nickname is Duplication"),
    CURRENT_PASSWORD_NOT_MATCH_EXCEPTION(400, "Current password not match exception"),
    LOGIN_DUPLICATION(409, "Current user is logined. You can not login to this account"),


    //Room
    ROOM_IS_NOT_AVAILABLE(409, "Room Status is Not Available"),
    ROOM_IS_FULL(409, "Room is Full"),
    ROOM_IS_ON_GAME(409, "Room is on Game"),
    ROOM_IS_OFFLINE(404, "Room is OFF"),
    ROOM_PASSWORD_NOT_MATCH(400, "Room password is Not Match"),


    JWT_TOKEN_EXPIRED(401,"JWT Token is expired"),

    //Record
    RECORD_IS_NULL(400,"Record is null");
    //Goal
//    GOAL_NOT_EXIST(400,"G001",)




    private int status;
    private final String message;


    ErrorCode(final int status, final String message) {
        this.status = status;
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }

    public int getStatus() {
        return status;
    }
}
