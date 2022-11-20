package com.cos.businessservice.api.response;

import com.cos.businessservice.DB.entity.Memo;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Builder
@Data
public class MemoResponse {

    private int pk;

    private String content;

    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd")
    private Timestamp memoDate;

    private boolean isDone;

    public static MemoResponse of(Memo memo){
        MemoResponse memoRes = MemoResponse.builder()
                .pk(memo.getPk())
                .content(memo.getContent())
                .memoDate(memo.getMemoDate())
                .isDone(memo.isDone())
                .build();
        return memoRes;
    }

}
