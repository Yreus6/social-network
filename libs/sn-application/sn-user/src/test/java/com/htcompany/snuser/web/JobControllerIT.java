package com.htcompany.snuser.web;

import static org.assertj.core.api.Assertions.assertThat;

import com.github.javafaker.Faker;
import com.htcompany.sncommon.IntegrationTest;
import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.Job;
import com.htcompany.sndomain.user.Profile;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.config.TestUserContextConfiguration;
import com.htcompany.snuser.graphql.input.JobInput;
import com.htcompany.snuser.repository.JobRepository;
import com.htcompany.snuser.repository.ProfileRepository;
import com.htcompany.snuser.repository.UserRepository;
import java.util.Date;
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
class JobControllerIT {

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
    private JobRepository jobRepository;

    private Faker faker;

    private String jobId;

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
        Job job = Job.of("abc", "", "", "", false, null, PrivacyType.PUBLIC);
        Job savedJob = jobRepository.save(job).block();
        jobId = savedJob.getId();
        savedProfile.addJob(savedJob);
        profileRepository.save(savedProfile).block();
    }

    @Test
    void givenUser_whenGetJobs_thenReturnJobs() {
        jobRepository.deleteAll().block();
        Profile p = profileRepository.getProfileByUser(USER_ID).block();

        for (int i = 0; i < 100; ++i) {
            Job job = Job.of(
                faker.company().name(), "Manager", "Hanoi",
                "Description",  false, null, PrivacyType.PUBLIC
            );
            Job savedJob = jobRepository.save(job).block();
            p.addJob(savedJob);
        }
        profileRepository.save(p).block();

        this.graphQlTester.queryName("GetJobsForUser")
            .variable("userId", USER_ID)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getJobs[*].id").entityList(String.class)
            .hasSize(100);
    }

    @Test
    void givenUser_whenGetAnotherJobsWithFriendPrivacy_thenReturnJobs() {
        jobRepository.deleteAll().block();
        User user2 = userRepository.save(User.of(
            USER_ID2, faker.name().username(), faker.internet().emailAddress(),
            faker.name().firstName(), "", faker.name().lastName()
        )).block();
        Profile p = profileRepository.save(Profile.of(
            null, null, new Date(),
            null, null, null, user2)
        ).block();
        Job job = Job.of(
            faker.company().name(), "Manager", "Hanoi",
            "Description", false, null, PrivacyType.FRIEND
        );
        p.addJob(job);
        profileRepository.save(p).block();

        this.graphQlTester.queryName("GetJobsForUser")
            .variable("userId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getJobs").entityList(Job.class)
            .satisfies(jobs -> {
                assertThat(jobs).isNotNull();
                assertThat(jobs).hasSize(0);
            });
    }

    @Test
    void givenUser_whenGetJob_thenReturnJob() {
        this.graphQlTester.queryName("GetJobForUser")
            .variable("userId", USER_ID)
            .variable("jobId", jobId)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getJob").entity(Job.class)
            .satisfies(j -> {
                assertThat(j).isNotNull();
                assertThat(j.getCompany()).isEqualTo("abc");
            });
    }

    @Test
    void givenUser_whenAddJob_thenReturnJob() {
        this.graphQlTester.queryName("AddJobForUser")
            .variable("userId", USER_ID)
            .variable(
                "jobInput",
                new JobInput("test", "", "", "", false, FROM_DATE, TO_DATE, "PUBLIC")
            )
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("addJob").entity(Job.class)
            .satisfies(job -> {
                assertThat(job).isNotNull();
                assertThat(job.getCompany()).isEqualTo("test");
            });
    }

    @Test
    void givenUser_whenEditJob_thenReturnUpdatedJob() {
        this.graphQlTester.queryName("EditJobForUser")
            .variable("userId", USER_ID)
            .variable("jobId", jobId)
            .variable(
                "jobInput",
                new JobInput(
                    "test1", "abc", "Hanoi",
                    "Description", false, FROM_DATE, TO_DATE, "FRIEND"
                )
            )
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("editJob").entity(Job.class)
            .satisfies(job -> {
                assertThat(job).isNotNull();
                assertThat(job.getCompany()).isEqualTo("test1");
            });
    }

    @Test
    void givenUser_whenRemoveJob_thenReturnSuccess() {
        this.graphQlTester.queryName("RemoveJobForUser")
            .variable("userId", USER_ID)
            .variable("jobId", jobId)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll().block();
        profileRepository.deleteAll().block();
        jobRepository.deleteAll().block();
    }
}
