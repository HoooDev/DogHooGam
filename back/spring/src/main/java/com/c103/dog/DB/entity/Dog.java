package com.c103.dog.DB.entity;

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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dog_pk")
    private int pk;

    @CreationTimestamp
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp createDate;

    private String transactionHash;

    private String dogImg;

    private String dogName;

    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp birthday;

    private String dogBreed;

    private String dogCharacter;

    private boolean isHide;

    @ManyToOne
    @JoinColumn(name = "uni_pk")
    private User user;


    @OneToMany(mappedBy = "dog" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Feed> dogList = new ArrayList<>();

    @OneToMany(mappedBy = "dog" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Memo> memoList = new ArrayList<>();

    @OneToMany(mappedBy = "dog" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Walk> walkList = new ArrayList<>();



}
