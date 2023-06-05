package com.htcompany.sndomain.user;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UserTest {

    private User user;

    private User user2;

    @BeforeEach
    void setUp() {
        user = User.of("1", "test", "test@example.com", "test", "", "user");
        user2 = User.of("2", "test2", "test2@example.com", "test2", "", "user2");
    }

    @Test
    void givenUser_whenSendRequestToOther_thenSuccess() {
        user.sendRequest(user2);

        assertThat(user.getSentRequests()).contains(user2);
    }

    @Test
    void givenUser_whenSendRequestToSelf_thenNotAddToSentRequests() {
        user.sendRequest(user);

        assertThat(user.getSentRequests()).doesNotContain(user);
    }
}
