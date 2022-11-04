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
    public Feed registerFeed(FeedPostRequest feedReq, User user)   throws IllegalArgumentException{

        Feed feedEntity = new Feed();
        feedEntity.setTransactionHash(feedReq.getTransactionHash());
        feedEntity.setLat(feedReq.getLat());
        feedEntity.setLng(feedReq.getLng());
        feedEntity.setContent(feedReq.getContent());
        feedEntity.setHide(false);
        feedEntity.setUser(user);
        feedEntity.setFeedImg(feedReq.getFeedImg());
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
    public List<Feed> findFeedByDay(User user, String year, String month){
        return feedRepository.findFeedByDay(user.getPk(), year, month);
    }

    @Override
    public List<Feed> findFeedByUser(User user) {
        List<Feed> feedList = feedRepository.findByUser(user);
        return feedList;
    }

}
