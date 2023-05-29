package com.htcompany.snapplication;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.*;

import com.htcompany.sncommon.security.AuthoritiesConstants;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.web.reactive.server.WebTestClient;

@AutoConfigureWebTestClient
@IntegrationTest
class HelloControllerIT {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    void givenUserAccessGreetingPage_whenLoginSuccess_thenHelloWorld() {
        this.webTestClient
            .mutateWith(
                mockJwt()
                    .authorities(new SimpleGrantedAuthority(AuthoritiesConstants.USER))
            )
            .get()
            .uri("/greeting")
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.content")
            .value(containsString("Hello"));
    }

    @Test
    void givenUserAccessGreetingPage_whenNotLogin_thenUnauthorized() {
        this.webTestClient
            .get()
            .uri("/greeting")
            .exchange()
            .expectStatus()
            .isUnauthorized()
            .expectHeader()
            .contentType(MediaType.APPLICATION_PROBLEM_JSON)
            .expectBody()
            .jsonPath("$.title")
            .isEqualTo("Unauthorized");
    }

    @Test
    void givenUserAccessGreetingPage_whenNotHaveUserAuthority_thenForbidden() {
        this.webTestClient
            .mutateWith(
                mockJwt()
                    .authorities(new SimpleGrantedAuthority(AuthoritiesConstants.ANONYMOUS))
            )
            .get()
            .uri("/greeting")
            .exchange()
            .expectStatus()
            .isForbidden()
            .expectHeader()
            .contentType(MediaType.APPLICATION_PROBLEM_JSON)
            .expectBody()
            .jsonPath("$.title")
            .isEqualTo("Forbidden");
    }
}
