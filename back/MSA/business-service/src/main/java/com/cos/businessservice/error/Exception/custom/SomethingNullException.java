package com.cos.businessservice.error.Exception.custom;


import com.cos.businessservice.error.Exception.InvalidValueException;

public class SomethingNullException extends InvalidValueException {
    public SomethingNullException(String r){
        super(r + "is null");
    }

}
