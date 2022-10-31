package com.c103.dog.DB.entity.redis;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Builder
@RedisHash(value = "people", timeToLive = 30)
@ToString
public class Person {
    @Id
    private String id; // 강아지Pk

    private int dogState;
    private double lat; // 경도
    private double lng;

    private int latArea; // 경도
    private int lngArea;

    private LocalDateTime createdAt;

}
