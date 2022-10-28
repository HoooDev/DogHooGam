package com.c103.dog.DB.entity;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DeptRepository extends CrudRepository<Dept, Long> {

    @Query(value = "SELECT * from Dept d where (year(d.time) = :year and month(d.time) = :month)",
            nativeQuery = true)
    List<Dept> findDeptByDeptNo(String year, String month);

}
