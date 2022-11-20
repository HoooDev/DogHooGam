package com.c103.dog.api.response;

import com.c103.dog.DB.entity.Memo;
import com.c103.dog.DB.entity.redis.Person;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PersonResponse {
    @ApiModelProperty(name="dogPk", example="1" , dataType = "int")
    private List<Integer> dogPk;

    @ApiModelProperty(name="위도", example="127.01")
    private double lat;

    @ApiModelProperty(name="경도", example="64.01")
    private double lng;

    @ApiModelProperty(name="개 상태", example="0" , value = "0, 1, 2 등등")
    private int dogState;

    public static PersonResponse of(Person person){
        PersonResponse personRes = PersonResponse.builder()
                .dogPk(person.getDogPk())
                .lat(person.getLat())
                .lng(person.getLng())
                .dogState(person.getDogState())
                .build();
        return personRes;
    }
}
