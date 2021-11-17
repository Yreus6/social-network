package com.htcompany.snuser.web;

import com.htcompany.sncommon.security.AuthoritiesConstants;
import com.htcompany.sncommon.security.SecurityUtils;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.graphql.input.NameInput;
import com.htcompany.snuser.graphql.input.PasswordInput;
import com.htcompany.snuser.service.UserService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

@Controller
@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @QueryMapping
    public Mono<User> getCurrentUser() {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return userService.getUserFromOkta(jwt.getClaimAsString("uid"));
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> changeName(@Argument String userId, @Argument NameInput nameInput) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> userService.changeNameForUser(userId, nameInput)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> changeEmail(@Argument String userId, @Argument String email) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> userService.changeEmailForUser(userId, email)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> changePassword(@Argument String userId, @Argument PasswordInput passwordInput) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> userService.changePasswordForUser(userId, passwordInput)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> deactivate(@Argument String userId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> userService.deactivateUser(userId)
            );
        });
    }
}
