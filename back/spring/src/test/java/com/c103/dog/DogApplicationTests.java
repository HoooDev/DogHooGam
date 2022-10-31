package com.c103.dog;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DogApplicationTests {

    @Test
    void contextLoads() {
        //35.0321664,126.7157848
        double a = 35.0321664;
        System.out.println("a : " + (a + 0.003));


    }

}
