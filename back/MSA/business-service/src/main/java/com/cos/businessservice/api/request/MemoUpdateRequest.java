package com.cos.businessservice.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class MemoUpdateRequest {
    @ApiModelProperty(name="memoPk", example="1" , dataType = "메모 PK")
    private int memoPk;

    private String content;
}
