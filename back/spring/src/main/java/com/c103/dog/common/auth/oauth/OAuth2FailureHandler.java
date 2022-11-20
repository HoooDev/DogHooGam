package com.c103.dog.common.auth.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2FailureHandler extends SimpleUrlAuthenticationFailureHandler{

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        String targetUrl;
        //response.setHeader("Authorization", JwtTokenUtil.TOKEN_PREFIX + accessToken);
        response.setContentType("text/html;charset=UTF-8");
        response.addHeader("error", exception.getLocalizedMessage());
        response.setContentType("application/json;charset=UTF-8");
        targetUrl = UriComponentsBuilder.fromHttpUrl("https://dog-hoogam.site/oauth/redirect")
                //targetUrl = UriComponentsBuilder.fromHttpUrl("https://k7c103.p.ssafy.io:3000/oauth/redirect")
                //targetUrl = UriComponentsBuilder.fromHttpUrl("http://k7c103.p.ssafy.io:3000/home")
                //.queryParam("accessToken", accessToken)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
