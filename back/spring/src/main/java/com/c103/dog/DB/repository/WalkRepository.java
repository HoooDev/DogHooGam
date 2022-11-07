package com.c103.dog.DB.repository;

import com.c103.dog.DB.entity.Walk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalkRepository extends JpaRepository<Walk, Integer> {

    @Query(value = "SELECT * from walk w where (year(w.create_date) = :year and month(w.create_date) = :month and w.user_pk = :userPk)",
            nativeQuery = true)
    List<Walk> findWalkByDay(int userPk, String year, String month);
}
