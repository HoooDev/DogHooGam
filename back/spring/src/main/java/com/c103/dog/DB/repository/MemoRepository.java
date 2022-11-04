package com.c103.dog.DB.repository;

import com.c103.dog.DB.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Integer> {

    @Query(value = "SELECT * from memo m where (year(m.memo_date) = :year and month(m.memo_date) = :month and m.user_pk = :userPk)",
            nativeQuery = true)
    List<Memo> findMemoByDay(int userPk, String year, String month);
}
