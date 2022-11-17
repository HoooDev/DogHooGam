package com.cos.businessservice.api.service;


import com.cos.businessservice.DB.entity.Feed;
import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.api.request.FeedPostRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FeedService {
    Feed registerFeed(FeedPostRequest feedReq, User user, MultipartFile file) throws IOException;

    Feed getByFeedPk(int feedPk);

    void updateByHide(Feed feed);

    List<Feed> findFeedByDay(User user, String year, String month);

    List<Feed> findFeedByUser(User user);
}
