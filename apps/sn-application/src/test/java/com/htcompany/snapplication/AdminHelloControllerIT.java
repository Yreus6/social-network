package com.htcompany.snapplication;

import static org.assertj.core.api.Assertions.assertThat;

import com.htcompany.sncommon.config.MockJwtAdminConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.graphql.boot.test.tester.AutoConfigureWebGraphQlTester;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureWebGraphQlTester
@IntegrationTest
@Import(MockJwtAdminConfiguration.class)
public class AdminHelloControllerIT {

    @Autowired
    private WebGraphQlTester graphQlTester;

    @Test
    void givenUserAccessGreetingPage_whenNotHaveUserAuthority_thenForbidden() {
        this.graphQlTester.queryName("greeting")
            .httpHeaders(headers -> headers.setBearerAuth("admin"))
            .execute()
            .errors()
            .satisfy(errors -> {
                assertThat(errors).hasSize(1);
                assertThat(errors.get(0).getErrorType()).isEqualTo(ErrorType.FORBIDDEN);
            });
    }
}
