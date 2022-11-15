package com.cos.businessservice.api.service;


import com.cos.businessservice.DB.entity.Memo;
import com.cos.businessservice.DB.entity.User;
import com.cos.businessservice.api.request.MemoPostRequest;
import com.cos.businessservice.api.request.MemoUpdateRequest;

import java.util.List;

public interface MemoService {
    Memo registerMemo(MemoPostRequest memoPostReq, User user);

    Memo getByMemoPk(int memoPk);

    Memo updateMemo(MemoUpdateRequest memoUpdateReq);

    void deleteMemo(int memoPk);

    List<Memo> findMemoByDay(User user);

    List<Memo> findMemoByMonth(User user, String year, String month);

    List<Memo> findMemoByUser(User user);
    void changeDone(int memoPk);
}
