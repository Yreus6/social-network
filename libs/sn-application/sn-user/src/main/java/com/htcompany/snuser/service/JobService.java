package com.htcompany.snuser.service;

import com.htcompany.sncommon.exception.EntityNotFoundException;
import com.htcompany.sndomain.user.Job;
import com.htcompany.snuser.graphql.input.JobInput;
import com.htcompany.snuser.repository.JobRepository;
import com.htcompany.snuser.repository.ProfileRepository;
import com.htcompany.snuser.service.mapper.JobMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class JobService {

    private final JobRepository jobRepository;

    private final ProfileRepository profileRepository;

    private final JobMapper mapper;

    public JobService(
        JobRepository jobRepository,
        ProfileRepository profileRepository,
        JobMapper mapper) {
        this.jobRepository = jobRepository;
        this.profileRepository = profileRepository;
        this.mapper = mapper;
    }

    public Flux<Job> getJobsForUser(String userId) {
        return jobRepository.findJobsByUser(userId);
    }

    @Transactional
    public Mono<Job> addJobForUser(String userId, JobInput jobInput) {
        return profileRepository.getProfileByUser(userId)
            .flatMap(profile -> {
                Job job = mapper.jobInputToJob(jobInput);

                return jobRepository.save(job)
                    .flatMap(savedJob -> {
                        profile.addJob(savedJob);

                        return profileRepository.save(profile)
                            .thenReturn(savedJob);
                    });
            });
    }

    public Mono<Job> editJobForUser(String userId, String jobId, JobInput jobInput) {
        return getJobByUser(userId, jobId)
            .flatMap(job -> {
                Job jobToUpdate = mapper.jobInputToJob(jobInput);
                job.updateWith(jobToUpdate);

                return jobRepository.save(job);
            });
    }

    public Mono<Job> removeJobForUser(String userId, String jobId) {
        return getJobByUser(userId, jobId)
            .flatMap(job -> jobRepository.delete(job).thenReturn(job));
    }

    private Mono<Job> getJobByUser(String userId, String jobId) {
        return jobRepository.findJobByUser(userId, jobId)
            .switchIfEmpty(Mono.error(new EntityNotFoundException("Could not find job")));
    }
}
