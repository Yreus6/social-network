package com.htcompany.sncommon.config;

import com.htcompany.sncommon.security.AuthoritiesConstants;
import com.htcompany.sncommon.test.util.JwtUtil;
import java.util.List;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.jwt.Jwt;
import reactor.core.publisher.Mono;

@TestConfiguration
public class MockJwtUserConfiguration {

    @Bean
    public Mono<Jwt> jwt() {
        return JwtUtil.createReactiveJwt(
            "user",
            List.of(AuthoritiesConstants.USER)
        );
    }
}
