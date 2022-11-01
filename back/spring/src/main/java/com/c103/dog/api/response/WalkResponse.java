package com.c103.dog.api.response;

import com.c103.dog.DB.entity.Memo;
import com.c103.dog.DB.entity.Walk;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.List;

@Builder
@Data
public class WalkResponse {

    private int pk;

    private double distance;

    private int coin;

    private List<double[]> walkPath;


    public static WalkResponse of(Walk walk){
        WalkResponse walkRes = WalkResponse.builder()
                .pk(walk.getPk())
                .distance(walk.getDistance())
                .coin(walk.getCoin())
                .walkPath(walk.stringToLine())
                .build();
        return walkRes;
    }


}
