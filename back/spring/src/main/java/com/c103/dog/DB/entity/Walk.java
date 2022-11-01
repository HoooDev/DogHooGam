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
import java.util.StringTokenizer;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Walk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "walk_pk")
    private int pk;

    private double distance;

    private int coin;

    private String walkPath;

    @CreationTimestamp
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp createDate;

    @ManyToOne
    @JoinColumn(name = "dog_pk")
    private Dog dog;

    public List<double[]> stringToLine(){

        List<double[]> result = new ArrayList<>();
        StringTokenizer st = new StringTokenizer(walkPath, ",");
        while(st.hasMoreTokens()){
            result.add(new double[] {Double.parseDouble(st.nextToken()),Double.parseDouble(st.nextToken())});
        }
        return result;
    }
}
