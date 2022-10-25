package com.c103.dog.DB.repository;

import com.c103.dog.DB.entity.Walk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalkRepository extends JpaRepository<Walk, Integer> {


}
