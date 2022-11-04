package com.c103.dog.api.service;

import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.Memo;
import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.entity.Walk;
import com.c103.dog.api.request.FeedPostRequest;
import com.c103.dog.api.request.MemoPostRequest;
import com.c103.dog.api.request.MemoUpdateRequest;

import java.util.List;

public interface MemoService {
    Memo registerMemo(MemoPostRequest memoPostReq, User user);

    Memo getByMemoPk(int memoPk);

    Memo updateMemo(MemoUpdateRequest memoUpdateReq);

    void deleteMemo(int memoPk);

    List<Memo> findMemoByDay(User user, String year, String month);

    List<Memo> findMemoByUser(User user);


}
