package com.cos.businessservice.api.response;


import com.cos.businessservice.DB.entity.Walk;
import com.cos.businessservice.common.util.Position;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import java.util.List;

@Builder
@Data
public class WalkResponse {

    private int pk;

    private double distance;

    private String time;

    private int coin;

    @Column(columnDefinition = "LONGTEXT")
    private List<Position> walkPath;

    private List<Integer> dogPkList;


    public static WalkResponse of(Walk walk){
        WalkResponse walkRes = WalkResponse.builder()
                .pk(walk.getPk())
                .distance(walk.getDistance())
                .coin(walk.getCoin())
                .walkPath(walk.stringToLine())
                .dogPkList(walk.pkToList())
                .time(walk.toTime())
                .build();
        return walkRes;
    }

}
