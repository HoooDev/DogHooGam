package com.cos.userservice.error.Exception.custom;


import com.cos.userservice.error.Exception.InvalidValueException;

public class SomethingNullException extends InvalidValueException {
    public SomethingNullException(String r){
        super(r + "is null");
    }

}
