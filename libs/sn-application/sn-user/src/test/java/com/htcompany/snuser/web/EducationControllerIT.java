package com.htcompany.snuser.web;

import static org.assertj.core.api.Assertions.assertThat;

import com.github.javafaker.Faker;
import com.htcompany.sncommon.IntegrationTest;
import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.Education;
import com.htcompany.sndomain.user.Profile;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.config.TestUserContextConfiguration;
import com.htcompany.snuser.graphql.input.EducationInput;
import com.htcompany.snuser.repository.EducationRepository;
import com.htcompany.snuser.repository.ProfileRepository;
import com.htcompany.snuser.repository.UserRepository;
import java.util.Collections;
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
class EducationControllerIT {

    private static final String USER_ID = "1";
    private static final String USERNAME = "test";
    private static final String USER_EMAIL = "test@example.com";
    private static final String USER_FIRSTNAME = "test";
    private static final String USER_MIDDLENAME = "";
    private static final String USER_LASTNAME = "user";

    private static final String USER_TOKEN = "user";

    private static final String FROM_DATE = "2011-12-03T10:15:30Z";
    private static final String TO_DATE = "2012-12-03T10:15:30Z";

    private static final String USER_ID2 = "2";

    @Autowired
    private WebGraphQlTester graphQlTester;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private EducationRepository educationRepository;

    private Faker faker;

    private String educationId;

    @BeforeEach
    void setUp() {
        faker = new Faker();
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
        Profile savedProfile = profileRepository.save(profile).block();
        Education education = Education.of(
            "abc", true, "", "",
            Collections.emptySet(), null, PrivacyType.PUBLIC
        );
        Education savedEdu = educationRepository.save(education).block();
        educationId = savedEdu.getId();
        savedProfile.addEducation(savedEdu);
        profileRepository.save(savedProfile).block();
    }

    @Test
    void givenUser_whenGetEducations_thenReturnEducations() {
        educationRepository.deleteAll().block();
        Profile p = profileRepository.getProfileByUser(USER_ID).block();

        for (int i = 0; i < 10; ++i) {
            Education education = Education.of(
                faker.pokemon().name(), true, "", "", Collections.emptySet(),
                null, PrivacyType.PUBLIC
            );
            Education savedEdu = educationRepository.save(education).block();
            p.addEducation(savedEdu);
        }
        profileRepository.save(p).block();

        this.graphQlTester.queryName("GetEducationsForUser")
            .variable("userId", USER_ID)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getEducations[*].id").entityList(String.class)
            .hasSize(10);
    }

    @Test
    void givenUser_whenGetAnotherEducationsWithFriendPrivacy_thenReturnEducations() {
        educationRepository.deleteAll().block();
        User user2 = userRepository.save(User.of(
            USER_ID2, faker.name().username(), faker.internet().emailAddress(),
            faker.name().firstName(), "", faker.name().lastName()
        )).block();
        Profile p = profileRepository.save(Profile.of(
            null, null, new Date(),
            null, null, null, user2)
        ).block();
        Education education = Education.of(
            faker.pokemon().name(), true, "", "", Collections.emptySet(),
            null, PrivacyType.FRIEND
        );
        Education savedEdu = educationRepository.save(education).block();
        p.addEducation(savedEdu);
        profileRepository.save(p).block();

        this.graphQlTester.queryName("GetEducationsForUser")
            .variable("userId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getEducations").entityList(Education.class)
            .satisfies(edus -> {
                assertThat(edus).isNotNull();
                assertThat(edus).hasSize(0);
            });
    }

    @Test
    void givenUser_whenGetEducation_thenReturnEducation() {
        this.graphQlTester.queryName("GetEducationForUser")
            .variable("userId", USER_ID)
            .variable("educationId", educationId)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getEducation").entity(Education.class)
            .satisfies(edu -> {
                assertThat(edu).isNotNull();
                assertThat(edu.getSchool()).isEqualTo("abc");
            });
    }

    @Test
    void givenUser_whenAddEducation_thenReturnEducation() {
        this.graphQlTester.queryName("AddEducationForUser")
            .variable("userId", USER_ID)
            .variable(
                "educationInput",
                new EducationInput(
                    "test", true, "", Collections.emptyList(),
                    "", FROM_DATE, TO_DATE, "PUBLIC"
                )
            )
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("addEducation").entity(Education.class)
            .satisfies(edu -> {
                assertThat(edu).isNotNull();
                assertThat(edu.getSchool()).isEqualTo("test");
            });
    }

    @Test
    void givenUser_whenEditEducation_thenReturnUpdatedEducation() {
        this.graphQlTester.queryName("EditEducationForUser")
            .variable("userId", USER_ID)
            .variable("educationId", educationId)
            .variable(
                "educationInput",
                new EducationInput(
                    "test1", false, "Description", List.of("a", "b", "c"),
                    "Master", "2015-12-03T10:15:30Z", "2016-12-03T10:15:30Z", "FRIEND"
                )
            )
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("editEducation").entity(Education.class)
            .satisfies(education -> {
                assertThat(education).isNotNull();
                assertThat(education.getSchool()).isEqualTo("test1");
                assertThat(education.getConcentrations()).hasSize(3);
            });
    }

    @Test
    void givenUser_whenRemoveEducation_thenReturnSuccess() {
        this.graphQlTester.queryName("RemoveEducationForUser")
            .variable("userId", USER_ID)
            .variable("educationId", educationId)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll().block();
        profileRepository.deleteAll().block();
        educationRepository.deleteAll().block();
    }
}
