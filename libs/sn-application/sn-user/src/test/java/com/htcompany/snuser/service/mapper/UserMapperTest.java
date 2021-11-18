package com.htcompany.snuser.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import com.htcompany.sndomain.user.User;
import com.okta.sdk.resource.user.UserProfile;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserMapperTest {

    private UserMapper userMapper;

    @Mock
    private com.okta.sdk.resource.user.User oktaUser;

    @Mock
    private UserProfile oktaProfile;

    @BeforeEach
    void setUp() {
        userMapper = new UserMapper();
    }

    @Test
    void givenOktaUserNull_whenMapToUser_thenReturnNull() {
        User user = userMapper.userFromOkta(null);

        assertThat(user).isNull();
    }

    @Test
    void givenOktaUserNotNull_whenMapToUser_thenReturnUser() {
        Mockito.when(oktaUser.getId()).thenReturn("1");
        Mockito.when(oktaUser.getProfile()).thenReturn(oktaProfile);
        Mockito.when(oktaProfile.getLogin()).thenReturn("test");
        Mockito.when(oktaProfile.getEmail()).thenReturn("test@example.com");
        Mockito.when(oktaProfile.getFirstName()).thenReturn("test");
        Mockito.when(oktaProfile.getMiddleName()).thenReturn("");
        Mockito.when(oktaProfile.getLastName()).thenReturn("user");

        User user = userMapper.userFromOkta(oktaUser);

        assertThat(user).isNotNull();
        assertThat(user.getId()).isEqualTo("1");
        assertThat(user.getUsername()).isEqualTo("test");
    }
}
