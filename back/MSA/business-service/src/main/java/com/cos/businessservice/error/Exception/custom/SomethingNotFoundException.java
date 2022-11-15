package com.cos.businessservice.error.Exception.custom;


import com.cos.businessservice.error.Exception.EntityNotFoundException;

public class SomethingNotFoundException extends EntityNotFoundException {
    public SomethingNotFoundException(String value){
        super(value+" is not found");
    }
}
