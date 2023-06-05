package com.htcompany.sncommon.test.util;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.security.oauth2.jwt.Jwt;
import reactor.core.publisher.Mono;

public class JwtUtil {

    public static Mono<Jwt> createReactiveJwt(String tokenValue, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("uid", "1");
        claims.put("sub", "test@example.com");
        claims.put("groups", authorities);

        return Mono.just(new Jwt(
            tokenValue,
            Instant.now(),
            Instant.now().plusSeconds(30),
            Map.of("alg", "none"),
            claims
        ));
    }
}
