package com.htcompany.snapplication;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

@AutoConfigureWebTestClient
@IntegrationTest
class HelloControllerIT {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    void shouldReturnHelloWorld() {
        this.webTestClient.get()
            .uri("/greeting")
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.content")
            .isEqualTo("Hello World!");
    }
}
