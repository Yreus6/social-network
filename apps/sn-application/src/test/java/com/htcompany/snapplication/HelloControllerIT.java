package com.htcompany.snapplication;

import static org.assertj.core.api.Assertions.assertThat;

import com.htcompany.sncommon.IntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.boot.test.tester.AutoConfigureWebGraphQlTester;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureWebGraphQlTester
@IntegrationTest
class HelloControllerIT {

    @Autowired
    private WebGraphQlTester graphQlTester;

    @Test
    void givenUserAccessGreetingPage_whenLoginSuccess_thenHello() {
        this.graphQlTester.queryName("Greeting")
            .httpHeaders(headers -> headers.setBearerAuth("user"))
            .execute()
            .path("greeting").entity(String.class).satisfies(
                s -> assertThat(s).contains("Hello")
            );
    }

    @Test
    void givenUserAccessGreetingPage_whenNotLogin_thenUnauthorized() {
        this.graphQlTester.queryName("Greeting")
            .execute()
            .errors()
            .satisfy(errors -> {
                assertThat(errors).hasSize(1);
                assertThat(errors.get(0).getErrorType()).isEqualTo(ErrorType.UNAUTHORIZED);
            });
    }
}
