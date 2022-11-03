package com.c103.dog;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@SpringBootTest
public class DateTest {
//
//    @Autowired
//    DeptRepository deptRepository;


    @Test
    @Commit
    void dateTest(){
//        Calendar cal = Calendar.getInstance();
//        cal.set(2022, 10, 1);
//
//        System.out.println("cal 출력 : " + cal.toString());
//
//        System.out.println("date 출력 : " + new Date(cal.getTimeInMillis()));
//
//        LocalDate date = LocalDate.of(2021, 12, 25);
//
//        System.out.println("LocalDate 출력 : " + date);
//
//        for(int i = 1;  i <25 ; i++){
//            LocalDate now = LocalDate.of(2021,1,1+i);
//            deptRepository.save(new Dept(i, "dname_" + String.valueOf(i) ,"loc_" +  String.valueOf(i) , Timestamp.valueOf(now.atStartOfDay())));
//        }
//
//
//        List<Dept> list = deptRepository.findDeptByDeptNo("2021" , "1");
//
//        for(Dept d : list){
//            System.out.println("날짜 출력 : " + d.getTime());
//        }



    }

}
