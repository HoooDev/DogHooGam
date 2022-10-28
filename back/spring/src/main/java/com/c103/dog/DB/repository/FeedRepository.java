package com.c103.dog.DB.repository;

import com.c103.dog.DB.entity.Dept;
import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Integer> {

    @Query(value = "SELECT * from Feed f where (year(f.time) = :year and month(f.time) = :month and f.dog_pk = :dogPk)",
            nativeQuery = true)
    List<Feed> findFeedByDay(int dogPk , String year, String month);

    List<Feed> findByDog(Dog d);
}
