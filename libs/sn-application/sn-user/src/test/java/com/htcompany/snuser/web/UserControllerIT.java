package com.htcompany.snuser.web;

import static org.assertj.core.api.Assertions.assertThat;

import com.htcompany.sncommon.IntegrationTest;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.config.TestUserContextConfiguration;
import com.htcompany.snuser.graphql.input.NameInput;
import com.htcompany.snuser.graphql.input.PasswordInput;
import com.htcompany.snuser.repository.UserRepository;
import com.okta.sdk.client.Client;
import com.okta.sdk.resource.user.ChangePasswordRequest;
import com.okta.sdk.resource.user.PasswordCredential;
import com.okta.sdk.resource.user.UserProfile;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.boot.test.tester.AutoConfigureWebGraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.test.context.ContextConfiguration;

@IntegrationTest
@AutoConfigureWebGraphQlTester
@ContextConfiguration(classes = {
    TestUserContextConfiguration.class
})
@ExtendWith(MockitoExtension.class)
class UserControllerIT {

    private static final String USER_ID = "1";
    private static final String USERNAME = "test";
    private static final String USER_EMAIL = "test@example.com";
    private static final String USER_FIRSTNAME = "test";
    private static final String USER_MIDDLENAME = "";
    private static final String USER_LASTNAME = "user";

    private static final String USER_TOKEN = "user";

    @Autowired
    private WebGraphQlTester graphQlTester;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Client oktaClient;

    @Mock
    private com.okta.sdk.resource.user.User oktaUser;

    @Mock
    private UserProfile oktaProfile;

    @Mock
    private PasswordCredential oktaPwCred;

    @Mock
    private ChangePasswordRequest oktaChangePwReq;

    @BeforeEach
    void setUp() {
        userRepository.save(User.of(
            USER_ID,
            USERNAME,
            USER_EMAIL,
            USER_FIRSTNAME,
            USER_MIDDLENAME,
            USER_LASTNAME
        )).block();

        Mockito.lenient().when(oktaClient.getUser(USER_ID)).thenReturn(oktaUser);
        Mockito.lenient().when(oktaUser.getId()).thenReturn(USER_ID);
        Mockito.lenient().when(oktaUser.getProfile()).thenReturn(oktaProfile);
        Mockito.lenient().when(oktaProfile.getLogin()).thenReturn(USERNAME);
        Mockito.lenient().when(oktaProfile.getEmail()).thenReturn(USER_EMAIL);
        Mockito.lenient().when(oktaProfile.getFirstName()).thenReturn(USER_FIRSTNAME);
        Mockito.lenient().when(oktaProfile.getMiddleName()).thenReturn(USER_MIDDLENAME);
        Mockito.lenient().when(oktaProfile.getLastName()).thenReturn(USER_LASTNAME);

        Mockito.lenient().when(oktaClient.instantiate(PasswordCredential.class))
            .thenReturn(oktaPwCred);
        Mockito.lenient().when(oktaClient.instantiate(ChangePasswordRequest.class))
            .thenReturn(oktaChangePwReq);
    }

    @Test
    void givenOktaUser_whenGetCurrentUser_thenReturnUser() {
        this.graphQlTester.queryName("GetUserFromOkta")
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getCurrentUser").entity(User.class)
            .satisfies(user -> {
                assertThat(user).isNotNull();
                assertThat(user.getId()).isEqualTo(USER_ID);
                assertThat(user.getUsername()).isEqualTo(USERNAME);
            });
    }

    @Test
    void givenUser_whenChangeName_thenReturnUpdatedUser() {
        this.graphQlTester.queryName("ChangeNameForUser")
            .variable("userId", USER_ID)
            .variable(
                "nameInput",
                new NameInput("test1", "test", "user1")
            )
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("changeName.id").entity(String.class)
            .isEqualTo(USER_ID)
            .path("changeName.firstName").entity(String.class)
            .isEqualTo("test1")
            .path("changeName.middleName").entity(String.class)
            .isEqualTo("test")
            .path("changeName.lastName").entity(String.class)
            .isEqualTo("user1");
    }

    @Test
    void givenUser_whenChangeEmail_thenReturnUpdatedUser() {
        this.graphQlTester.queryName("ChangeEmailForUser")
            .variable("userId", USER_ID)
            .variable("email", "test1@example.com")
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("changeEmail.id").entity(String.class)
            .isEqualTo(USER_ID)
            .path("changeEmail.email").entity(String.class)
            .isEqualTo("test1@example.com");
    }

    @Test
    void givenUser_whenChangePassword_thenReturnSuccess() {
        Mockito.when(oktaClient.instantiate(PasswordCredential.class).setValue("1234".toCharArray()))
            .thenReturn(oktaPwCred);
        Mockito.when(oktaClient.instantiate(PasswordCredential.class).setValue("1235".toCharArray()))
            .thenReturn(oktaPwCred);
        Mockito.when(oktaClient.instantiate(ChangePasswordRequest.class).setOldPassword(oktaPwCred))
            .thenReturn(oktaChangePwReq);
        Mockito.when(oktaClient.instantiate(ChangePasswordRequest.class).setNewPassword(oktaPwCred))
            .thenReturn(oktaChangePwReq);
        Mockito.when(oktaUser.changePassword(oktaChangePwReq))
            .thenReturn(null);


        this.graphQlTester.queryName("ChangePasswordForUser")
            .variable("userId", USER_ID)
            .variable(
                "passwordInput",
                new PasswordInput("1234", "1235")
            )
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();
    }

    @Test
    void givenUser_whenDeactivate_thenReturnSuccess() {
        this.graphQlTester.queryName("DeactivateUser")
            .variable("userId", USER_ID)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll().block();
    }
}
