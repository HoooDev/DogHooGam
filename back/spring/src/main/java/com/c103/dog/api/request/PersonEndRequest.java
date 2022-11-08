package com.c103.dog.api.request;

import com.c103.dog.common.util.Position;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@Getter
@ApiModel(value = "PersonEndRequest",description = "산책 종료")
public class PersonEndRequest {

    private int coin;

    private double distance;

    private List<Position> walkPath;

    public String lineToString(){
        StringBuilder sb = new StringBuilder();
        for(Position p : this.walkPath){
            System.out.println(p.getLat() + " " + p.getLng());
            sb.append(p.getLat()).append(",").append(p.getLng()).append(",");
        }
        return sb.toString();
    }



}
