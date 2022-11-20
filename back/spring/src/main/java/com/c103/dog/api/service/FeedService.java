package com.c103.dog.api.service;

import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.User;
import com.c103.dog.api.request.FeedPostRequest;

import java.util.List;

public interface FeedService {
    Feed registerFeed(FeedPostRequest feedReq, User user);

    Feed getByFeedPk(int feedPk);

    void updateByHide(Feed feed);

    List<Feed> findFeedByDay(User user, String year, String month);

    List<Feed> findFeedByUser(User user);
}
