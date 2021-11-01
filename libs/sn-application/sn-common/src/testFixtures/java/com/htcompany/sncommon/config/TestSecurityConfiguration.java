package com.htcompany.sncommon.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import reactor.core.publisher.Mono;

@TestConfiguration
public class TestSecurityConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public ReactiveJwtDecoder jwtDecoder(Mono<Jwt> jwt) {
        return token -> jwt;
    }
}
