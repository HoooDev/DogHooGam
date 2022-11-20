package com.cos.businessservice.DB.repository;


import com.cos.businessservice.DB.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Integer> {

    @Query(value = "SELECT * from memo m where (year(m.memo_date) = :year and month(m.memo_date) = :month and day(m.memo_date) = :day and m.user_pk = :userPk)",
            nativeQuery = true)
    List<Memo> findMemoByDay(int userPk, String year, String month, String day);
    @Query(value = "SELECT * from memo m where (year(m.memo_date) = :year and month(m.memo_date) = :month and m.user_pk = :userPk )",
            nativeQuery = true)
    List<Memo> findMemoByMonth(int userPk, String year, String month);
}
