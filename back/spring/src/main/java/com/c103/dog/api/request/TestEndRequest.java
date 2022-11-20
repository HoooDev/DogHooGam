package com.c103.dog.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Data
class Node1{
    double lat;
    double lng;
}
@Getter
@ApiModel(value = "TestEndRequest",description = "산책 종료")
public class TestEndRequest {

    private List<Node1> www;

}
