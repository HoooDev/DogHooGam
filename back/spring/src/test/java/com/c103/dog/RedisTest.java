package com.c103.dog;

import com.c103.dog.DB.entity.redis.Person;
import com.c103.dog.DB.entity.redis.PersonId;
import com.c103.dog.DB.repository.redis.PersonIdRedisRepository;
import com.c103.dog.DB.repository.redis.PersonRedisRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class RedisTest {
    @Autowired
    private PersonRedisRepository repo;

    @Autowired
    private PersonIdRedisRepository personIdRedisRepository;

    @Test
    void test() {
        personIdRedisRepository.deleteById("121231@");
        PersonId personId = new PersonId();
        personId.setUserId("1");
        personId.setPersonId("1");

        System.out.println("//////////////////////////////////////////////////////////////////");
        PersonId second = personIdRedisRepository.save(personId);

        System.out.println("save Person Id :" + second.toString() );
        System.out.println("personId count : " + personIdRedisRepository.count());

        System.out.println("//////////////////////////////////////////////////////////////////");

        Person person = new Person();

        person.setId(personId.getPersonId());

        Person personSecond = repo.save(person);

        System.out.println("save Person :" + personSecond.toString() );
        System.out.println("person count : " + repo.count());

        System.out.println("//////////////////////////////////////////////////////////////////");

        PersonId find = personIdRedisRepository.findById("1").orElse(null);
        System.out.println("find Person Id :" + find.toString() );
        System.out.println("personId count : " + personIdRedisRepository.count());

        personIdRedisRepository.deleteById("1");

        System.out.println("after delete personId count : " + personIdRedisRepository.count());

        System.out.println("//////////////////////////////////////////////////////////////////");

        Person findPerson = repo.findById(find.getPersonId()).orElse(null);

        System.out.println("find Person :" + findPerson.toString() );

        repo.deleteById(findPerson.getId());

        System.out.println("after delete person count : " + repo.count());


        repo.deleteAll();
        personIdRedisRepository.deleteAll();



//        double a = 35.0321664;
//        double b = 126.7157848;
//        //35.0321664,126.7157848
//
//        System.out.println("????????? ??????");
//
//        System.out.println("??????? " + repo.findById("1"));
//        System.out.println(repo.findById("1").isEmpty());
//        for(int i = 0 ; i < 30 ; i++) {
//            Person person = Person.builder()
//                    .createdAt(LocalDateTime.now())
//                    .id(Integer.toString(i))
//
//                    .lat(b+ (double) 0.001*i)
//                    .build();
//
//            repo.save(person);
//        }
//        System.out.println(repo.findById("1").isEmpty());
//        System.out.println("?????? : " + repo.count());
//
//        List<Person> personList = repo.findAll();
//
//
//        //repo.deleteById(5);
//
//        System.out.println("5??? ?????? ????????? :" +repo.count() );
//
////        Person person = Person.builder()
////                .createdAt(LocalDateTime.now())
////                .dogPk(5)
////                .lan(a + (double) 0.001*5)
////                .lat(b+ (double) 0.001*5)
////                .build();
////
////        repo.save(person);
//
//        System.out.println("5??? ?????? ??? ?????? :" +repo.count() );
//
//        for(Person p : personList){
//            System.out.println(p.getId() + " : " + p.toString());
//        }
//
//
//        repo.deleteAll();
//
////        // ??????
////        repo.save(person);
////
////        // `keyspace:id` ?????? ?????????
////        repo.findById(person.getId());
////
////        // Person Entity ??? @RedisHash ??? ???????????? ?????? keyspace (people) ??? ?????? ?????? ????????? ??????
////        repo.count();
////
////        repo.
////
////        // ??????
////        repo.delete(person);
    }

}
