package com.c103.dog.error.Exception.custom;


import com.c103.dog.error.Exception.InvalidValueException;

public class SomethingNullException extends InvalidValueException {
    public SomethingNullException(String r){
        super(r + "is null");
    }

}
