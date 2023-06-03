package com.htcompany.snapplication;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class HelloController {

    @GetMapping("/greeting")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public Mono<GenericResponse> greeting(JwtAuthenticationToken token) {
        return Mono.just(new GenericResponse(
            String.format("Hello %s!", token.getName())
        ));
    }
}
