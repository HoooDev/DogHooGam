package com.c103.dog.error;


import com.c103.dog.error.Exception.ErrorCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ErrorResponse {
    private String message;
    private int statusCode;
    private String errorClass;
    private String errorDetail;


    private ErrorResponse(final ErrorCode code) {
        this.message = code.getMessage();
        this.statusCode = code.getStatus();
        this.errorDetail = code.getMessage();

    }


    public ErrorResponse(final ErrorCode code,String errorDetail) {
        this.message = code.getMessage();
        this.statusCode = code.getStatus();
        this.errorDetail = errorDetail;
        this.errorClass = String.valueOf(code.getClass());
    }
    public ErrorResponse(final ErrorCode code,String errorDetail,String errorClass) {
        this.message = code.getMessage();
        this.statusCode = code.getStatus();
        this.errorDetail = errorDetail;
        this.errorClass =errorClass;
    }


    public static ErrorResponse of(final ErrorCode code) {
        return new ErrorResponse(code);
    }

    public static ErrorResponse of(final ErrorCode code, final String detail){
        return new ErrorResponse(code, detail);
    }

    public static ErrorResponse of(final ErrorCode code, final String detail,final String errorClass){
        return new ErrorResponse(code, detail,errorClass);
    }


}
