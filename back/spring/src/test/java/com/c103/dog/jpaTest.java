package com.c103.dog;

import com.c103.dog.DB.entity.Memo;
import com.c103.dog.DB.repository.MemoRepository;
import com.c103.dog.error.Exception.custom.SomethingNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class jpaTest {

    @Autowired
    MemoRepository memoRepository;
@Test
    public void test(){
//    Memo memo = memoRepository.findById(145).orElseThrow(() -> new SomethingNotFoundException("145"));
//
}

}
