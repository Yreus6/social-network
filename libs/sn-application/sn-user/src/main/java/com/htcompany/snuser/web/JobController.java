package com.htcompany.snuser.web;

import com.htcompany.sncommon.security.SecurityUtils;
import com.htcompany.sndomain.user.Job;
import com.htcompany.snuser.graphql.input.JobInput;
import com.htcompany.snuser.service.JobService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @QueryMapping
    public Flux<Job> getJobs(@Argument String userId) {
        return Flux.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return jobService.getJobsForUser(userId, jwt.getClaimAsString("uid"));
        });
    }

    @QueryMapping
    @SuppressWarnings("unchecked")
    public Mono<Job> getJob(@Argument String userId, @Argument String jobId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Job>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> jobService.getJobForUser(userId, jobId)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Job> addJob(@Argument String userId, @Argument JobInput jobInput) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Job>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> jobService.addJobForUser(userId, jobInput)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Job> editJob(
        @Argument String userId, @Argument String jobId, @Argument JobInput jobInput) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Job>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> jobService.editJobForUser(userId, jobId, jobInput)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Job> removeJob(@Argument String userId, @Argument String jobId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Job>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> jobService.removeJobForUser(userId, jobId)
            );
        });
    }
}
