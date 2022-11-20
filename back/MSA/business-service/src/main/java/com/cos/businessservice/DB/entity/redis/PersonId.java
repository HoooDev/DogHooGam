package com.cos.businessservice.DB.entity.redis;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;


@Data
@RedisHash(value = "userid", timeToLive = -1)
@ToString
@NoArgsConstructor
public class PersonId {
    @Id
    private String userId;

    private String personId;

    private List<Integer> dogPk; //강아지 Pk;

}
