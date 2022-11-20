package com.cos.userservice.error.Exception.custom;


import com.cos.userservice.error.Exception.EntityNotFoundException;

public class SomethingNotFoundException extends EntityNotFoundException {
    public SomethingNotFoundException(String value){
        super(value+" is not found");
    }
}
