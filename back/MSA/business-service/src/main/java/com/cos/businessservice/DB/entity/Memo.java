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
public class Memo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memo_pk")
    private int pk;

    private String content;

    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd")
    private Timestamp memoDate;

    @ManyToOne
    @JoinColumn(name = "user_pk")
    private User user;

    private boolean isDone;

    @CreationTimestamp
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp createDate;

}
