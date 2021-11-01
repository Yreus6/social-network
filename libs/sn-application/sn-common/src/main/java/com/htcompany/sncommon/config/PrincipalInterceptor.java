package com.htcompany.sncommon.config;

import org.springframework.graphql.web.WebInput;
import org.springframework.graphql.web.WebInterceptor;
import org.springframework.graphql.web.WebInterceptorChain;
import org.springframework.graphql.web.WebOutput;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class PrincipalInterceptor implements WebInterceptor {

    private final ReactiveJwtDecoder decoder;

    public PrincipalInterceptor(ReactiveJwtDecoder decoder) {
        this.decoder = decoder;
    }

    @Override
    public Mono<WebOutput> intercept(WebInput webInput, WebInterceptorChain chain) {
        return chain.next(webInput).contextWrite(context -> {
            if (webInput.getHeaders().containsKey("Authorization")) {
                String token = webInput.getHeaders().getFirst("Authorization")
                    .replace("Bearer", "").trim();
                try {
                    Jwt jwt = decoder.decode(token).toFuture().get();

                    return context.put("jwt", jwt);
                } catch (Exception e) {
                    return context;
                }
            } else {
                return context;
            }
        });
    }
}
