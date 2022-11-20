package com.cos.apigatewayservice.filter;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.cos.apigatewayservice.util.JwtTokenUtil;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {
    Environment env;

    public AuthorizationHeaderFilter(Environment env){
        super(Config.class);
        this.env = env;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            if(!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                return onError(exchange, "no authorization header", HttpStatus.UNAUTHORIZED);
            }

            String jwt = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            //String jwt = authorizationHeader.replace("Bearer ", "");

            log.info("jwt : {} ",jwt);

            if(!isJwtValid(jwt)){
                return onError(exchange,"JWT token is not valid", HttpStatus.UNAUTHORIZED);
            }

            return chain.filter(exchange);
        };
    }

    private Mono<Void> onError(ServerWebExchange exchange, String error, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);

        log.error(error);
        return response.setComplete();
    }

    private boolean isJwtValid(String jwt) {
        boolean returnValue = true;

        String subject = null;
        try {
//            subject = Jwts.parser().setSigningKey(env.getProperty("token.secret"))
//                    .parseClaimsJws(jwt).getBody()
//                    .getSubject();
            subject = JwtTokenUtil.getUserId(jwt);
        }catch (Exception ex){
            log.info("exception 에러 발생");
            returnValue = false;
        }

        if(subject == null || subject.isEmpty()){
            log.info("subject null or isEnpty");
            returnValue = false;
        }


        return returnValue;
    }

    public static class Config{

    }
}
