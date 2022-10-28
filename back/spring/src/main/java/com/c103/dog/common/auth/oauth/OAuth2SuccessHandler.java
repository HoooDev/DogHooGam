package com.c103.dog.common.auth.oauth;

import com.c103.dog.DB.entity.User;
import com.c103.dog.DB.repository.UserRepository;
import com.c103.dog.common.util.JwtTokenUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

// Success Handler 진입 -> 로그인이 완료된 상태
@Slf4j
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    UserRepository userRepository;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        log.info(oAuth2User.getAttributes().toString());

        Map<String, Object> map = (Map<String, Object>) oAuth2User.getAttributes();

        User userEntity = User.builder()
                .userId((String) map.get("providerId"))
                .role("ROLE_USER")
                .nickName((String) map.get("name"))
                .profileImg((String) map.get("profileImg"))
                .build();


        if(userRepository.findByUserId(userEntity.getUserId()) == null){
            log.info("첫 로그인, 회원가입 진행");
            userRepository.save(userEntity);
        }else{
            log.info("로그인 된 유저, 자동으로 로그인");
        }


        String accessToken = JwtTokenUtil.getToken(userEntity.getUserId());

        log.info("accessToken : {}" , accessToken);

        String targetUrl;

        response.setContentType("text/html;charset=UTF-8");
        response.addHeader("accessToken", accessToken);
        response.setContentType("application/json;charset=UTF-8");
        targetUrl = UriComponentsBuilder.fromHttpUrl("http://localhost:8080/oauth/redirect")
        .queryParam("accessToken", accessToken)
        .build().toUriString();
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }


}
