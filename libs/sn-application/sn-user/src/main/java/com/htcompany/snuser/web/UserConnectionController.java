package com.htcompany.snuser.web;

import com.htcompany.sncommon.security.AuthoritiesConstants;
import com.htcompany.sncommon.security.SecurityUtils;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.service.UserConnectionService;
import graphql.relay.Connection;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

@Controller
@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
public class UserConnectionController {

    private final UserConnectionService connectionService;

    public UserConnectionController(UserConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @QueryMapping
    public Mono<Connection<User>> getFriends(DataFetchingEnvironment env) {
        return connectionService.getFriendsForUser(env);
    }

    @QueryMapping
    public Mono<Connection<User>> getFollowings(DataFetchingEnvironment env) {
        return connectionService.getFollowingsForUser(env);
    }

    @QueryMapping
    public Mono<Connection<User>> getFollowers(DataFetchingEnvironment env) {
        return connectionService.getFollowersForUser(env);
    }

    @QueryMapping
    public Mono<Connection<User>> getMutualFriends(DataFetchingEnvironment env) {
        return connectionService.getMutualFriendsForUsers(env);
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> sendFriendRequest(@Argument String userId, @Argument String targetId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> connectionService.sendFriendRequestForUser(userId, targetId)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> confirmFriendRequest(@Argument String userId, @Argument String targetId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> connectionService.confirmFriendRequestForUser(userId, targetId)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> declineFriendRequest(@Argument String userId, @Argument String targetId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> connectionService.declineFriendRequestForUser(userId, targetId)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> cancelSentRequest(@Argument String userId, @Argument String targetId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> connectionService.cancelSentRequestForUser(userId, targetId)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> removeFriend(@Argument String userId, @Argument String friendId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> connectionService.removeFriendForUser(userId, friendId)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> follow(@Argument String userId, @Argument String followedId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> connectionService.followUser(userId, followedId)
            );
        });
    }

    @MutationMapping
    @SuppressWarnings("unchecked")
    public Mono<User> unfollow(@Argument String userId, @Argument String followedId) {
        return Mono.deferContextual(ctx -> {
            Jwt jwt = ctx.get("jwt");

            return (Mono<User>) SecurityUtils.checkUser(
                jwt.getClaimAsString("uid"), userId,
                () -> connectionService.unfollowUser(userId, followedId)
            );
        });
    }
}
