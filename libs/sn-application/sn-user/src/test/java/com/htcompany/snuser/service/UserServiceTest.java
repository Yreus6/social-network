package com.htcompany.snuser.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.htcompany.sncommon.exception.EntityNotFoundException;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.graphql.input.NameInput;
import com.htcompany.snuser.repository.UserRepository;
import com.htcompany.snuser.service.mapper.UserMapper;
import com.okta.sdk.client.Client;
import com.okta.sdk.resource.user.UserProfile;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    private static final String USER_ID = "1";

    @Mock
    private Client oktaClient;

    @Mock
    private com.okta.sdk.resource.user.User oktaUser;

    @Mock
    private UserProfile oktaProfile;

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    void setUp() {
        UserMapper userMapper = new UserMapper();
        userService = new UserService(oktaClient, userRepository, userMapper);

        Mockito.lenient().when(oktaClient.getUser(USER_ID)).thenReturn(oktaUser);
        Mockito.lenient().when(oktaUser.getId()).thenReturn(USER_ID);
        Mockito.lenient().when(oktaUser.getProfile()).thenReturn(oktaProfile);
        Mockito.lenient().when(oktaProfile.getLogin()).thenReturn("test");
        Mockito.lenient().when(oktaProfile.getEmail()).thenReturn("test@example.com");
        Mockito.lenient().when(oktaProfile.getFirstName()).thenReturn("test");
        Mockito.lenient().when(oktaProfile.getMiddleName()).thenReturn("");
        Mockito.lenient().when(oktaProfile.getLastName()).thenReturn("user");

        Mockito.lenient().when(userRepository.findById(USER_ID))
            .thenReturn(Mono.just(
                User.of(USER_ID, "test", "test@example.com", "test", "", "user")
            ));
        Mockito.lenient().when(userRepository.save(Mockito.any(User.class)))
            .thenReturn(Mono.just(
                User.of(USER_ID, "test", "test@example.com", "test", "", "user")
            ));
    }

    @Test
    void givenOktaUser_whenGetSameUserFromOkta_thenReturnUser() {
        User user = userService.getUserFromOkta(USER_ID).block();

        assertThat(user).isNotNull();
        assertThat(user.getId()).isEqualTo(USER_ID);
        assertThat(user.getUsername()).isEqualTo("test");
    }

    @Test
    void givenOktaUser_whenGetDifferentUserFromOkta_thenReturnUpdatedUser() {
        Mockito.when(oktaProfile.getLogin()).thenReturn("test1");
        Mockito.when(userRepository.save(Mockito.any(User.class)))
            .thenReturn(Mono.just(
                User.of(USER_ID, "test1", "test@example.com", "test", "", "user")
            ));

        User user = userService.getUserFromOkta(USER_ID).block();

        assertThat(user).isNotNull();
        assertThat(user.getUsername()).isEqualTo("test1");
    }

    @Test
    void givenEmptyUser_whenChangeName_thenThrowException() {
        Mockito.when(userRepository.findById(USER_ID)).thenReturn(Mono.empty());

        NameInput nameInput = new NameInput("test1", "test", "user");

        assertThatThrownBy(() -> userService.changeNameForUser(USER_ID, nameInput).block())
            .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void givenOktaUser_whenChangeName_thenReturnUpdatedUser() {
        Mockito.when(userRepository.save(Mockito.any(User.class)))
            .thenReturn(Mono.just(
                User.of(USER_ID, "test", "test@example.com", "test1", "test", "user1")
            ));

        NameInput nameInput = new NameInput("test1", "test", "user");
        User user = userService.changeNameForUser(USER_ID, nameInput).block();

        assertThat(user).isNotNull();
        assertThat(user.getFirstName()).isEqualTo("test1");
        assertThat(user.getMiddleName()).isEqualTo("test");
        assertThat(user.getLastName()).isEqualTo("user1");
    }

    @Test
    void givenOktaUser_whenChangeEmail_thenReturnUpdatedUser() {
        Mockito.when(userRepository.save(Mockito.any(User.class)))
            .thenReturn(Mono.just(
                User.of(USER_ID, "test", "test1@example.com", "test", "", "user")
            ));

        User user = userService.changeEmailForUser(USER_ID, "test1@example.com").block();

        assertThat(user).isNotNull();
        assertThat(user.getEmail()).isEqualTo("test1@example.com");
    }
}
