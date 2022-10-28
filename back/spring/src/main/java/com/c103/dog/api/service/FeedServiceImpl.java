package com.c103.dog.api.service;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.repository.DogRepository;
import com.c103.dog.DB.repository.FeedRepository;
import com.c103.dog.api.request.FeedPostRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FeedServiceImpl implements FeedService{

    @Autowired
    DogRepository dogRepository;

    @Autowired
    FeedRepository feedRepository;

    @Override
    public Feed registerFeed(FeedPostRequest feedReq)   throws IllegalArgumentException{
        Dog dog = dogRepository.getById(feedReq.getDogPk());

        Feed feedEntity = Feed.builder()
                .transactionHash(feedReq.getTransactionHash())
                .feedImg(feedReq.getFeedImg())
                .content(feedReq.getContent())
                .lng(feedReq.getLng())
                .lat(feedReq.getLat())
                .isHide(false)
                .dog(dog)
                .build();
        return feedRepository.save(feedEntity);
    }

    @Override
    public Feed getByFeedPk(int feedPk) {
        return feedRepository.getById(feedPk);
    }

    @Override
    public void updateByHide(Feed feed) {
        if (feed.isHide()){
            feed.setHide(false);
        }else{
            feed.setHide(true);
        }

        feedRepository.save(feed);
    }

    @Override
    public List<Feed> findFeedByDay(int dogPk, String year, String month){
        return feedRepository.findFeedByDay(dogPk, year, month);
    }

    @Override
    public List<Feed> findFeedByUser(User user) {
        List<Dog> dogList = dogRepository.findByUser(user);

        List<Feed> feedList = new ArrayList<>();

        for(Dog d : dogList){
            List<Feed> f = feedRepository.findByDog(d);
            feedList.addAll(f);
        }

        return feedList;
    }

}
