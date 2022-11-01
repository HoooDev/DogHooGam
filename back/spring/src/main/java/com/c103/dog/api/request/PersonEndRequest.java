package com.c103.dog.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@Getter
@ApiModel(value = "PersonEndRequest",description = "산책 종료")
public class PersonEndRequest {
    @ApiModelProperty(name="산책Pk", example="dsffefef")
    private String personId;

    private int coin;

    private double distance;

    private List<double[]> walkPath;

    public String lineToString(){
        StringBuilder sb = new StringBuilder();
        for(double [] a : this.walkPath){
            System.out.println(a[0] + " " + a[1]);
            sb.append(a[0]).append(",").append(a[1]).append(",");
        }
        return sb.toString();
    }



}
