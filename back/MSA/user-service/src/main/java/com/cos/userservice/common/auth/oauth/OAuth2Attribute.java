package com.cos.userservice.common.auth.oauth;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@ToString
@Builder(access = AccessLevel.PRIVATE)
@Getter
public class OAuth2Attribute {
    private Map<String, Object> attributes;
    private String attributeKey;
    private String name;

    private String providerId;

    private String profileImg;

    // provider마다 제공해주는 값이 달라 분기처리를 위해 구현

    static OAuth2Attribute of(String provider, String attributeKey, Map<String, Object> attributes){
        switch (provider){
//            case "google":
//                return ofGoogle(attributeKey, attributes);
            case "kakao":
                return ofKakao("id", attributes);
//            case "naver":
//                return ofNaver("id", attributes);
            default:
                throw new RuntimeException();
        }
    }


//    private static OAuth2Attribute ofGoogle(String attributeKey, Map<String, Object> attributes){
//        return OAuth2Attribute.builder()
//                .name((String) attributes.get("name"))
//                .attributes(attributes)
//                .attributeKey(attributeKey)
//                .build();
//    }

    private static OAuth2Attribute ofKakao(String attributeKey, Map<String, Object> attributes){
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuth2Attribute.builder()
                .providerId(attributes.get("id").toString())
                .name((String) kakaoProfile.get("nickname"))
                .profileImg((String) kakaoProfile.get("profile_image_url"))
                .attributes(kakaoAccount)
                .attributeKey(attributeKey)
                .build();
    }
//
//    private static OAuth2Attribute ofNaver(String attributeKey, Map<String, Object> attributes){
//        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
//        return OAuth2Attribute.builder()
//                .name((String)response.get("name"))
//                .email((String) response.get("email"))
//                .attributes(response)
//                .attributeKey(attributeKey)
//                .build();
//    }

    Map<String, Object> covertToMap(){
        Map<String, Object> map = new HashMap<>();
        map.put("providerId", providerId);
        map.put("key", attributeKey);
        map.put("name", name);
        map.put("profileImg" , profileImg);
        return map;
    }

}
