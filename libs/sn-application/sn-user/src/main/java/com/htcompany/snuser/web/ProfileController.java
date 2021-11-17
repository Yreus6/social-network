package com.htcompany.snuser.web;

import com.htcompany.sncommon.security.AuthoritiesConstants;
import com.htcompany.sncommon.security.SecurityUtils;
import com.htcompany.sndomain.user.Profile;
import com.htcompany.snuser.graphql.input.AddressInput;
import com.htcompany.snuser.graphql.input.BirthdayInput;
import com.htcompany.snuser.graphql.input.PhoneInput;
import com.htcompany.snuser.service.ProfileService;
import java.util.List;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

@Controller
@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @QueryMapping
    public Mono<Profile> getUserProfile(@Argument String userId) {
        return profileService.getProfileForUser(userId);
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Profile> editAddress(@Argument String userId, @Argument AddressInput addressInput) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Profile>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> profileService.editAddressForUser(userId, addressInput)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Profile> editBirthday(@Argument String userId, @Argument BirthdayInput birthdayInput) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Profile>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> profileService.editBirthdayForUser(userId, birthdayInput)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Profile> editPhone(@Argument String userId, @Argument PhoneInput phoneInput) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Profile>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> profileService.editPhoneForUser(userId, phoneInput)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Profile> editGender(@Argument String userId, @Argument String gender) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Profile>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> profileService.editGenderForUser(userId, gender)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Profile> editBio(@Argument String userId, @Argument String biography) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Profile>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> profileService.editBioForUser(userId, biography)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<Profile> editInterests(@Argument String userId, @Argument List<String> interests) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<Profile>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> profileService.editInterestsForUser(userId, interests)
            );
        });
    }
}
