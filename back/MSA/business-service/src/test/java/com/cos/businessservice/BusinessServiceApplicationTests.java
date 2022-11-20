package com.cos.businessservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;

@SpringBootTest
class BusinessServiceApplicationTests {

	@Test
	void contextLoads() {
		LocalDate now = LocalDate.now();
		System.out.println("////////////////////////////////////////////////////////");

		System.out.println("year : {}" + now.getYear());
		System.out.println("month : {}" +now.getMonthValue());
		System.out.println("day : {}" +now.getDayOfMonth());

		LocalDateTime time = LocalDateTime.now();

		System.out.println(time.toString());


	}

}
