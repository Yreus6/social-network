package com.htcompany.snapplication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class HelloController {

    @GetMapping("/greeting")
    public Mono<GenericResponse> greeting() {
        return Mono.just(new GenericResponse("Hello World!"));
    }
}
