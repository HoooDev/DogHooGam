package com.c103.dog.error.Exception.custom;


import com.c103.dog.error.Exception.EntityNotFoundException;

public class SomethingNotFoundException extends EntityNotFoundException {
    public SomethingNotFoundException(String value){
        super(value+" is not found");
    }
}
