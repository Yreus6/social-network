package com.htcompany.snapplication;

import com.htcompany.sncommon.security.AuthoritiesConstants;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

@Controller
public class HelloController {

    @QueryMapping
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public Mono<String> greeting() {
        return Mono.deferContextual(context -> {
            Jwt jwt = context.get("jwt");

            return Mono.just(String.format("Hello %s!", jwt.getSubject()));
        });
    }
}
