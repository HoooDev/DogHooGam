package com.c103.dog.api.service;

import com.c103.dog.DB.entity.Dog;
import com.c103.dog.DB.entity.Feed;
import com.c103.dog.DB.entity.Memo;
import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.repository.DogRepository;
import com.c103.dog.DB.repository.FeedRepository;
import com.c103.dog.DB.repository.MemoRepository;
import com.c103.dog.api.request.MemoPostRequest;
import com.c103.dog.api.request.MemoUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class MemoServiceImpl implements MemoService {
    @Autowired
    DogRepository dogRepository;

    @Autowired
    MemoRepository memoRepository;

    @Override
    public Memo registerMemo(MemoPostRequest memoPostReq) throws IllegalArgumentException {
        Dog dog = dogRepository.getById(memoPostReq.getDogPk());

        Memo memoEntity = Memo.builder()
                .memoDate(Timestamp.valueOf(memoPostReq.getMemoDate()))
                .content(memoPostReq.getContent())
                .title(memoPostReq.getTitle())
                .dog(dog)
                .build();
        return memoRepository.save(memoEntity);
    }

    @Override
    public Memo getByMemoPk(int memoPk) {
        return memoRepository.getById(memoPk);
    }

    @Override
    public Memo updateMemo(MemoUpdateRequest memoUpdateReq) throws IllegalArgumentException{
        Memo memo = memoRepository.getById(memoUpdateReq.getMemoPk());

        memo.setTitle(memoUpdateReq.getTitle());
        memo.setContent(memoUpdateReq.getContent());

        return memoRepository.save(memo);

    }

    @Override
    public void deleteMemo(int memoPk) {
        memoRepository.deleteById(memoPk);
    }

    @Override
    public List<Memo> findMemoByDay(int dogPk, String year, String month) {
        return memoRepository.findMemoByDay(dogPk, year, month);
    }

    @Override
    public List<Memo> findMemoByUser(User user) {
        return null;
    }
}
