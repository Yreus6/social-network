package com.htcompany.snuser.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.htcompany.sncommon.exception.EntityNotFoundException;
import com.htcompany.sndomain.shared.DateRange;
import com.htcompany.sndomain.shared.DateRangeService;
import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.Job;
import com.htcompany.sndomain.user.Profile;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.graphql.input.JobInput;
import com.htcompany.snuser.repository.JobRepository;
import com.htcompany.snuser.repository.ProfileRepository;
import com.htcompany.snuser.repository.UserRepository;
import com.htcompany.snuser.service.mapper.JobMapper;
import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@ExtendWith(MockitoExtension.class)
class JobServiceTest {

    private static final String USER_ID = "1";

    private static final String FROM_DATE = "2011-12-03T10:15:30Z";
    private static final String TO_DATE = "2012-12-03T10:15:30Z";

    private static final String JOB_ID = "1";

    private static final String USER_ID2 = "2";

    @Mock
    private ProfileRepository profileRepository;

    @Mock
    private JobRepository jobRepository;

    @Mock
    private UserRepository userRepository;

    private JobService jobService;

    @BeforeEach
    void setUp() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setFieldMatchingEnabled(true)
            .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE);
        JobMapper jobMapper = new JobMapper(mapper);
        jobService = new JobService(
            jobRepository, profileRepository, userRepository, jobMapper
        );

        User user = User.of(USER_ID, "test", "test@example.com", "test", "", "user");
        Profile profile = Profile.of(
            null, null, new Date(), null, null, null, user);
        Mockito.lenient().when(userRepository.findById(USER_ID))
            .thenReturn(Mono.just(user));
        Mockito.lenient().when(profileRepository.getProfileByUser(USER_ID))
            .thenReturn(Mono.just(profile));
        Mockito.lenient().when(profileRepository.save(profile)).thenReturn(Mono.just(profile));

        DateRange dateRange = DateRangeService.createDateRange(FROM_DATE, TO_DATE);
        Job job = Job.of("test", "", "", "", dateRange, PrivacyType.PUBLIC);
        Mockito.lenient().when(jobRepository.findJobByUser(USER_ID, JOB_ID))
            .thenReturn(Mono.just(job));
        Mockito.lenient().when(jobRepository.save(job)).thenReturn(Mono.just(job));
        Mockito.lenient().when(jobRepository.delete(job)).thenReturn(Mono.empty());

        User user2 = User.of(USER_ID2, "test2", "test2@example.com", "test2", "", "user2");
        Mockito.lenient().when(userRepository.findFriendByUser(USER_ID, USER_ID2))
            .thenReturn(Mono.just(user2));
    }

    @Test
    void givenUser_whenGetAnotherJobsWithPrivatePrivacy_thenReturnJobs() {
        Job job = Job.of("test", "", "", "", null, PrivacyType.PRIVATE);
        Mockito.when(jobRepository.findJobsByUser(USER_ID))
            .thenReturn(Flux.fromIterable(List.of(job)));

        List<Job> jobs = jobService.getJobsForUser(USER_ID, USER_ID2).collectList().block();

        assertThat(jobs).isNotNull();
        assertThat(jobs).hasSize(0);
    }

    @Test
    void givenUser_whenGetAnotherJobsWithFriendPrivacy_thenReturnJobs() {
        Job job = Job.of("test", "", "", "", null, PrivacyType.FRIEND);
        Mockito.when(userRepository.findFriendByUser(USER_ID, USER_ID2))
            .thenReturn(Mono.empty());
        Mockito.when(jobRepository.findJobsByUser(USER_ID))
            .thenReturn(Flux.fromIterable(List.of(job)));

        List<Job> jobs = jobService.getJobsForUser(USER_ID, USER_ID2).collectList().block();

        assertThat(jobs).isNotNull();
        assertThat(jobs).hasSize(0);
    }

    @Test
    void givenUser_whenGetFriendJobsWithFriendPrivacy_thenReturnJobs() {
        Job job = Job.of("test", "", "", "", null, PrivacyType.FRIEND);
        Mockito.when(jobRepository.findJobsByUser(USER_ID))
            .thenReturn(Flux.fromIterable(List.of(job)));

        List<Job> jobs = jobService.getJobsForUser(USER_ID, USER_ID2).collectList().block();

        assertThat(jobs).isNotNull();
        assertThat(jobs).hasSize(1);
        assertThat(jobs.get(0).getCompany()).isEqualTo("test");
    }

    @Test
    void givenUser_whenAddJob_thenReturnJob() {
        Job job = jobService.addJobForUser(
            USER_ID,
            new JobInput(
                "test", "", "", "", FROM_DATE, TO_DATE, "PUBLIC"
            )
        ).block();

        assertThat(job).isNotNull();
        assertThat(job.getCompany()).isEqualTo("test");
    }

    @Test
    void givenUser_whenEditExistJob_thenReturnUpdatedJob() {
        JobInput jobInput = new JobInput(
            "test1", "", "", "", FROM_DATE, TO_DATE, "FRIEND"
        );
        Job updated = jobService.editJobForUser(USER_ID, JOB_ID, jobInput).block();

        assertThat(updated).isNotNull();
        assertThat(updated.getCompany()).isEqualTo("test1");
    }

    @Test
    void givenUser_whenEditNotExistJob_thenReturnError() {
        Mockito.when(jobRepository.findJobByUser(USER_ID, "2")).thenReturn(Mono.empty());

        JobInput jobInput = new JobInput(
            "test1", "", "", "", FROM_DATE, TO_DATE, "FRIEND"
        );

        assertThatThrownBy(() -> jobService.editJobForUser(USER_ID, "2", jobInput).block())
            .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void givenUser_whenRemoveJob_thenReturnSuccess() {
        Job job = jobService.removeJobForUser(USER_ID, JOB_ID).block();

        assertThat(job).isNotNull();
    }
}
