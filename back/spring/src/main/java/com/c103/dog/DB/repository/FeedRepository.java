package com.c103.dog.DB.repository;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Integer> {

    @Query(value = "SELECT * from feed f where (year(f.create_date) = :year and month(f.create_date) = :month and f.user_pk = :userPk)",
            nativeQuery = true)
    List<Feed> findFeedByDay(int userPk , String year, String month);

    List<Feed> findByUser(User user);
}
