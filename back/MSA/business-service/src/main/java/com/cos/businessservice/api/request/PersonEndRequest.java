package com.cos.businessservice.api.request;


import com.cos.businessservice.common.util.Position;
import io.swagger.annotations.ApiModel;
import lombok.Getter;

import java.util.List;

@Getter
@ApiModel(value = "PersonEndRequest",description = "산책 종료")
public class PersonEndRequest {

    private long time;

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
