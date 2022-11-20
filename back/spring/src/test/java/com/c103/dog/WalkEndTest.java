package com.c103.dog;

import com.c103.dog.DB.entity.Walk;
import com.c103.dog.DB.repository.WalkRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;



@SpringBootTest
public class WalkEndTest {
    class Position {
        double lat;
        double lng;
        Position(double lat, double lng){
            this.lat = lat;
            this.lng = lng;
        }

        public double getLat() {
            return lat;
        }

        public double getLng() {
            return lng;
        }
    }

    @Autowired
    WalkRepository walkRepository;

    @Test
    public void test(){
              List<Position> positions = new ArrayList<>();

              for(int i =0; i < 1200; i++){
                  positions.add(new Position(35.2056676,126.8115927));
              }

            StringBuilder sb = new StringBuilder();
            for(Position p : positions){
                System.out.println(p.getLat() + " " + p.getLng());
                sb.append(p.getLat()).append(",").append(p.getLng()).append(",");
            }


        Walk walk = new Walk();

            walk.setWalkPath(sb.toString());


          int id =   walkRepository.save(walk).getPk();

          Walk test = walkRepository.findById(id).orElse(null);
        System.out.println(test.getWalkPath());

        }






    }

