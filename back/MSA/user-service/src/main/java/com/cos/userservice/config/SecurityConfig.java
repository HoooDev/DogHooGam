package com.cos.userservice.config;

import com.cos.userservice.api.service.UserService;
import com.cos.userservice.common.auth.JwtAuthenticationFilter;
import com.cos.userservice.common.auth.SsafyUserDetailsService;
import com.cos.userservice.common.auth.oauth.CustomOAuth2UserService;
import com.cos.userservice.common.auth.oauth.OAuth2FailureHandler;
import com.cos.userservice.common.auth.oauth.OAuth2SuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private SsafyUserDetailsService ssafyUserDetailService;
    private UserService userService;
    private CustomOAuth2UserService oAuth2UserService;
    private OAuth2SuccessHandler successHandler;
    private OAuth2FailureHandler failureHandler;

    @Autowired
    public SecurityConfig(SsafyUserDetailsService ssafyUserDetailService, UserService userService, CustomOAuth2UserService oAuth2UserService, OAuth2SuccessHandler successHandler ,OAuth2FailureHandler failureHandler){
        this.failureHandler = failureHandler;
        this.oAuth2UserService = oAuth2UserService;
        this.userService = userService;
        this.successHandler = successHandler;
        this.ssafyUserDetailService = ssafyUserDetailService;
    }

    // DAO 기반으로 Authentication Provider를 생성
    // BCrypt Password Encoder와 UserDetailService 구현체를 설정
    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder());
        daoAuthenticationProvider.setUserDetailsService(this.ssafyUserDetailService);
        return daoAuthenticationProvider;
    }

    // DAO 기반의 Authentication Provider가 적용되도록 설정
    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.httpFirewall(defaultHttpFirewall());
    }

    @Bean
    public HttpFirewall defaultHttpFirewall() {
        return new DefaultHttpFirewall();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.headers().frameOptions().disable();
        http.authorizeRequests().antMatchers("/**").permitAll();
        http.oauth2Login().successHandler(successHandler)
                .failureHandler(failureHandler)
                .userInfoEndpoint() // OAuth2 로그인 성공 후에 가져올 설정들
                .userService(oAuth2UserService); // 서버에서 사용자 정보를 가져온 상태에서 추가로 진행하고자 하는 기능 명시

        http.addFilterBefore(new JwtAuthenticationFilter(authenticationManager(), userService),
                UsernamePasswordAuthenticationFilter.class);

    }


}
