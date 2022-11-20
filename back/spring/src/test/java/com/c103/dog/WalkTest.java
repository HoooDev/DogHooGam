package com.c103.dog;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

@SpringBootTest
public class WalkTest {
    public static List<int[]> resource = new ArrayList<>();

    static {
        resource.add(new int[] {1,2});
        resource.add(new int[] {2,4});
        resource.add(new int[] {6,5});
        resource.add(new int[] {5,8});
        resource.add(new int[] {2,0});
    }
    @Test
    public void test(){
        List<int[]> result = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        for(int [] a : resource){
            System.out.println(a[0] + " " + a[1]);
            sb.append(a[0]).append(",").append(a[1]).append(",");
        }



        System.out.println(sb.toString());

        System.out.println("split 분할");
        String s[] = sb.toString().split(",");
        int i = 1;
        for(String a : s){
            System.out.println((i++) + " " + a);
        }

        System.out.println("stringTokenizer 분할");

        StringTokenizer st = new StringTokenizer(sb.toString(), ",");

        i = 1;
        while(st.hasMoreTokens()){
            result.add(new int[] {Integer.parseInt(st.nextToken()),Integer.parseInt(st.nextToken())});
        }

        for(int [] a : result){
            System.out.println(a[0] + " " + a[1]);

        }


    }

}
