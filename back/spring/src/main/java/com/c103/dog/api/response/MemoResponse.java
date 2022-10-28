package com.c103.dog.api.response;

import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.Memo;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Builder
@Data
public class MemoResponse {

    private int pk;

    private String title;

    private String content;

    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp memoDate;

    public static MemoResponse of(Memo memo){
        MemoResponse memoRes = MemoResponse.builder()
                .pk(memo.getPk())
                .title(memo.getTitle())
                .content(memo.getContent())
                .memoDate(memo.getMemoDate())
                .build();
        return memoRes;
    }


}
