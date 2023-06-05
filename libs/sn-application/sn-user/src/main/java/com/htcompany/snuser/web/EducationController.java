package com.htcompany.snuser.web;

import com.htcompany.sncommon.security.SecurityUtils;
import com.htcompany.sndomain.user.Education;
import com.htcompany.snuser.graphql.input.EducationInput;
import com.htcompany.snuser.service.EducationService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @QueryMapping
    public Flux<Education> getEducations(@Argument String userId) {
        return Flux.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return educationService.getEducationsForUser(userId, jwt.getClaimAsString("uid"));
        });
    }

    @QueryMapping
    @SuppressWarnings("unchecked")
    public Mono<Education> getEducation(@Argument String userId, @Argument String educationId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Education>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> educationService.getEducationForUser(userId, educationId)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Education> addEducation(@Argument String userId, @Argument EducationInput educationInput) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Education>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> educationService.addEducationForUser(userId, educationInput)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Education> editEducation(
        @Argument String userId, @Argument String educationId, @Argument EducationInput educationInput) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Education>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> educationService.editEducationForUser(userId, educationId, educationInput)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Education> removeEducation(@Argument String userId, @Argument String educationId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Education>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> educationService.removeEducationForUser(userId, educationId)
            );
        });
    }
}
