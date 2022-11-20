package com.cos.businessservice.DB.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

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


    @ManyToOne
    @JoinColumn(name = "user_pk")
    private User user;


}
