package com.c103.dog.DB.entity;

import com.c103.dog.common.util.Position;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_pk")
    private int pk;

    private String feedImg;

    private double lat;

    private double lng;

    private String content;

    private boolean isHide;

    private String transactionHash;

    @CreationTimestamp
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp createDate;

    private String dogPkList;

    @ManyToOne
    @JoinColumn(name = "user_pk")
    private User user;

    public List<Integer> stringToLine(){

        List<Integer> result = new ArrayList<>();
        StringTokenizer st = new StringTokenizer(this.dogPkList, ",");
        while(st.hasMoreTokens()){
            result.add(Integer.parseInt(st.nextToken()));
        }
        return result;
    }

}
