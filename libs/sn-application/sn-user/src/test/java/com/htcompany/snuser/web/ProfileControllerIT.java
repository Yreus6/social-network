package com.htcompany.snuser.web;

import static org.assertj.core.api.Assertions.assertThat;

import com.htcompany.sncommon.IntegrationTest;
import com.htcompany.sndomain.user.*;
import com.htcompany.snuser.config.TestUserContextConfiguration;
import com.htcompany.snuser.graphql.input.AddressInput;
import com.htcompany.snuser.graphql.input.BirthdayInput;
import com.htcompany.snuser.graphql.input.PhoneInput;
import com.htcompany.snuser.repository.ProfileRepository;
import com.htcompany.snuser.repository.UserRepository;
import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.boot.test.tester.AutoConfigureWebGraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.test.context.ContextConfiguration;

@IntegrationTest
@AutoConfigureWebGraphQlTester
@ContextConfiguration(classes = {
    TestUserContextConfiguration.class
})
class ProfileControllerIT {

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
    private ProfileRepository profileRepository;

    @BeforeEach
    void setUp() {
        User user = userRepository.save(User.of(
            USER_ID,
            USERNAME,
            USER_EMAIL,
            USER_FIRSTNAME,
            USER_MIDDLENAME,
            USER_LASTNAME
        )).block();

        Profile profile = Profile.of(
            null, null, new Date(), null, null, null, user
        );
        profileRepository.save(profile).block();
    }

    @Test
    void givenUser_whenGetProfile_thenReturnProfile() {
        this.graphQlTester.queryName("GetProfileForUser")
            .variable("userId", USER_ID)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getUserProfile").entity(Profile.class)
            .satisfies(p -> {
                assertThat(p).isNotNull();
                assertThat(p.getUser()).isNotNull();
                assertThat(p.getUser().getFirstName()).isEqualTo(USER_FIRSTNAME);
            });
    }

    @Test
    void givenUser_whenEditAddress_thenReturnSuccess() {
        this.graphQlTester.queryName("EditAddressForUser")
            .variable("userId", USER_ID)
            .variable(
                "addressInput",
                new AddressInput("Hanoi", "Hanoi", "Vietnam", "PUBLIC")
            )
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("editAddress.address").entity(Address.class)
            .satisfies(address -> {
                assertThat(address).isNotNull();
                assertThat(address.getCity()).isEqualTo("Hanoi");
            });
    }

    @Test
    void givenUser_whenEditBirthday_thenReturnSuccess() {
        this.graphQlTester.queryName("EditBirthdayForUser")
            .variable("userId", USER_ID)
            .variable(
                "birthdayInput",
                new BirthdayInput("2011-12-03T10:15:30Z", "PUBLIC")
            )
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("editBirthday.birthday").entity(Birthday.class)
            .satisfies(birthday -> {
                assertThat(birthday).isNotNull();
                assertThat(birthday.getBirthdate()).hasYear(2011);
            });
    }

    @Test
    void givenUser_whenEditPhone_thenReturnSuccess() {
        this.graphQlTester.queryName("EditPhoneForUser")
            .variable("userId", USER_ID)
            .variable(
                "phoneInput",
                new PhoneInput("+84123456789", "PUBLIC")
            )
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("editPhone.phoneNumber").entity(PhoneNumber.class)
            .satisfies(phone -> {
                assertThat(phone).isNotNull();
                assertThat(phone.getPhone()).isEqualTo("+84123456789");
            });
    }

    @Test
    void givenUser_whenEditGender_thenReturnSuccess() {
        this.graphQlTester.queryName("EditGenderForUser")
            .variable("userId", USER_ID)
            .variable("gender", "male")
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("editGender.gender").entity(String.class)
            .isEqualTo("male");
    }

    @Test
    void givenUser_whenEditBio_thenReturnSuccess() {
        this.graphQlTester.queryName("EditBioForUser")
            .variable("userId", USER_ID)
            .variable("biography", "About me")
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("editBio.biography").entity(String.class)
            .isEqualTo("About me");
    }

    @Test
    void givenUser_whenEditInterests_thenReturnSuccess() {
        this.graphQlTester.queryName("EditInterestsForUser")
            .variable("userId", USER_ID)
            .variable("interests", List.of("a", "b", "c"))
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("editInterests.interests").entityList(String.class)
            .hasSize(3);
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll().block();
        profileRepository.deleteAll().block();
    }
}
