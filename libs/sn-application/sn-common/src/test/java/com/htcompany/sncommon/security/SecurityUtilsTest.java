package com.htcompany.sncommon.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.htcompany.sncommon.exception.ForbiddenException;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Mono;

class SecurityUtilsTest {

    @Test
    void givenSameUser_whenCheck_thenCallSupplier() {
        String s = (String) SecurityUtils.checkUser(
            "id1", "id1", () -> Mono.just("test")).block();

        assertThat(s).isEqualTo("test");
    }

    @Test
    void givenDifferentUser_whenCheck_thenReturnError() {
        assertThatThrownBy(() -> SecurityUtils.checkUser(
            "id1", "id2", () -> Mono.just("test")).block()
        ).isInstanceOf(ForbiddenException.class);
    }
}
