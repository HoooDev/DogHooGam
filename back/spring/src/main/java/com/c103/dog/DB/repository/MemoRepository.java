package com.c103.dog.DB.repository;

import com.c103.dog.DB.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Integer> {

    @Query(value = "SELECT * from Memo m where (year(m.memo_date) = :year and month(m.memo_date) = :month and m.dog_pk = :dogPk)",
            nativeQuery = true)
    List<Memo> findMemoByDay(int dogPk, String year, String month);
}
