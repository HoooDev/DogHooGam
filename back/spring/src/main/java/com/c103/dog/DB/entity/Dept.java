package com.c103.dog.DB.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Dept {

    @Id
    Integer deptNo;
    String dName;
    String loc;

    private Timestamp time;

}
