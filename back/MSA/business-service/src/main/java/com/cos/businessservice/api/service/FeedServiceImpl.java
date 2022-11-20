package com.cos.businessservice.api.service;


import com.cos.businessservice.DB.entity.Feed;
import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.DB.repository.DogRepository;
import com.cos.businessservice.DB.repository.FeedRepository;
import com.cos.businessservice.api.request.FeedPostRequest;
import com.cos.businessservice.common.util.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class FeedServiceImpl implements FeedService{

    @Autowired
    S3Service s3Service;


    @Autowired
    DogRepository dogRepository;

    @Autowired
    FeedRepository feedRepository;

    @Override
    public Feed registerFeed(FeedPostRequest feedReq, User user, MultipartFile file) throws IllegalArgumentException, IOException {


        Map<String,String> map = s3Service.upload(file, "P");

        Feed feedEntity = new Feed();
        feedEntity.setTransactionHash(feedReq.getTransactionHash());
        feedEntity.setLat(feedReq.getLat());
        feedEntity.setLng(feedReq.getLng());
        feedEntity.setContent(feedReq.getContent());
        feedEntity.setHide(false);
        feedEntity.setUser(user);
        feedEntity.setFeedImg(map.get("fileUrl"));
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
