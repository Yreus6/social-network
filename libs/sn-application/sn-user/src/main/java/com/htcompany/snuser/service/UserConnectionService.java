package com.htcompany.snuser.service;

import com.htcompany.sncommon.exception.EntityNotFoundException;
import com.htcompany.sncommon.exception.ForbiddenException;
import com.htcompany.sncommon.graphql.pagination.AdvancedListConnection;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.repository.UserRepository;
import graphql.relay.Connection;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserConnectionService {

    private final UserRepository userRepository;

    public UserConnectionService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Mono<Connection<User>> getFriendsForUser(DataFetchingEnvironment env) {
        return userRepository.findFriendsByUser(env.getArgument("userId"))
            .collectList()
            .map(friends -> new AdvancedListConnection<>(friends)
                .getWithCount(env, friends.size())
            );
    }

    public Mono<Connection<User>> getFollowingsForUser(DataFetchingEnvironment env) {
        return userRepository.findFollowingsByUser(env.getArgument("userId"))
            .collectList()
            .map(followings -> new AdvancedListConnection<>(followings)
                .getWithCount(env, followings.size())
            );
    }

    public Mono<Connection<User>> getFollowersForUser(DataFetchingEnvironment env) {
        return userRepository.findFollowersByUser(env.getArgument("userId"))
            .collectList()
            .map(followers -> new AdvancedListConnection<>(followers)
                .getWithCount(env, followers.size())
            );
    }

    public Mono<Connection<User>> getMutualFriendsForUsers(DataFetchingEnvironment env) {
        String userId = env.getArgument("userId");
        String otherId = env.getArgument("otherId");

        return userRepository.findMutualFriendsBetweenUsers(userId, otherId)
            .collectList()
            .map(friends -> new AdvancedListConnection<>(friends)
                .getWithCount(env, friends.size())
            );
    }

    public Mono<Connection<User>> getFriendRequestsForUser(DataFetchingEnvironment env) {
        String userId = env.getArgument("userId");

        return userRepository.findFriendRequestsByUser(userId)
            .collectList()
            .map(requests -> new AdvancedListConnection<>(requests)
                .getWithCount(env, requests.size())
            );
    }

    public Mono<Connection<User>> getSentRequestsForUser(DataFetchingEnvironment env) {
        String userId = env.getArgument("userId");

        return userRepository.findSentRequestsByUser(userId)
            .collectList()
            .map(requests -> new AdvancedListConnection<>(requests)
                .getWithCount(env, requests.size())
            );
    }

    public Mono<Connection<User>> getFriendSuggestionsForUser(DataFetchingEnvironment env) {
        String userId = env.getArgument("userId");

        return userRepository.findFriendSuggestionsForUser(userId)
            .collectList()
            .map(suggestions -> new AdvancedListConnection<>(suggestions)
                .getWithCount(env, suggestions.size())
            );
    }

    public Mono<User> sendFriendRequestForUser(String userId, String targetId) {
        return userRepository.findById(userId)
            .zipWith(userRepository.findById(targetId))
            .flatMap(tuple -> {
                User user = tuple.getT1();
                User target = tuple.getT2();

                return userRepository.findFriendByUser(userId, targetId)
                    .doOnNext(f -> {
                        if (f != null) {
                            throw new ForbiddenException("Could not send request");
                        }
                    })
                    .switchIfEmpty(
                        userRepository.findSentRequestByUser(targetId, userId)
                            .doOnNext(r -> {
                                if (r != null) {
                                    throw new ForbiddenException("Could not send request");
                                }
                            })
                            .switchIfEmpty(Mono.defer(() -> {
                                user.sendRequest(target);

                                return userRepository.save(user);
                            }))
                    );
            });
    }

    public Mono<User> confirmFriendRequestForUser(String userId, String targetId) {
        return getFriendRequestByUser(userId, targetId)
            .flatMap(requestUser -> userRepository.findById(userId)
                .flatMap(user -> userRepository.findById(requestUser.getId())
                    .flatMap(reqUser -> {
                        reqUser.removeSentRequest(user);
                        user.friendWith(reqUser);
                        reqUser.friendWith(user);
                        user.follow(reqUser);
                        reqUser.follow(user);

                        return userRepository.save(reqUser)
                            .then(userRepository.save(user));
                    })
                )
            );
    }

    public Mono<User> declineFriendRequestForUser(String userId, String targetId) {
        return getFriendRequestByUser(userId, targetId)
            .flatMap(requestUser -> userRepository.findById(userId)
                .flatMap(user -> {
                    requestUser.removeSentRequest(user);

                    return userRepository.save(requestUser)
                        .thenReturn(user);
                })
            );
    }

    public Mono<User> cancelSentRequestForUser(String userId, String targetId) {
        return getSentRequestByUser(userId, targetId)
            .flatMap(sentToUser -> userRepository.findById(userId)
                .flatMap(user -> {
                    user.removeSentRequest(sentToUser);

                    return userRepository.save(user);
                })
            );
    }

    public Mono<User> removeFriendForUser(String userId, String friendId) {
        return getFriendByUser(userId, friendId)
            .flatMap(friend -> userRepository.findById(userId)
                .flatMap(user -> userRepository.findById(friend.getId())
                    .flatMap(f -> {
                        user.removeFriend(f);
                        f.removeFriend(user);
                        user.unfollow(f);
                        f.unfollow(user);

                        return userRepository.save(f)
                            .then(userRepository.save(user));
                    })
                )
            );
    }

    public Mono<User> followUser(String userId, String followedId) {
        return userRepository.findById(userId)
            .zipWith(userRepository.findById(followedId))
            .flatMap(tuple -> {
                User user = tuple.getT1();
                User followed = tuple.getT2();
                user.follow(followed);

                return userRepository.save(user);
            });
    }

    public Mono<User> unfollowUser(String userId, String followedId) {
        return getFollowingByUser(userId, followedId)
            .flatMap(followed -> userRepository.findById(userId)
                .flatMap(user -> {
                    user.unfollow(followed);

                    return userRepository.save(user);
                })
            );
    }

    public Mono<Integer> countFriendsForUser(String userId) {
        return userRepository.findFriendsByUser(userId).count().map(Long::intValue);
    }

    public Mono<Integer> countMutualFriendsForUsers(String userId, String otherId) {
        return userRepository.findMutualFriendsBetweenUsers(userId, otherId)
            .count().map(Long::intValue);
    }

    public Mono<Boolean> isFriend(String userId, String targetId) {
        return userRepository.findFriendByUser(userId, targetId)
            .hasElement();
    }

    public Mono<Boolean> isFollowing(String userId, String targetId) {
        return userRepository.findFollowingByUser(userId, targetId)
            .hasElement();
    }

    public Mono<Boolean> isRequestFriend(String userId, String targetId) {
        return userRepository.findSentRequestByUser(userId, targetId)
            .hasElement();
    }

    private Mono<User> getFriendRequestByUser(String userId, String targetId) {
        return userRepository.findFriendRequestByUser(userId, targetId)
            .switchIfEmpty(Mono.error(new EntityNotFoundException("Could not find request")));
    }

    private Mono<User> getSentRequestByUser(String userId, String targetId) {
        return userRepository.findSentRequestByUser(userId, targetId)
            .switchIfEmpty(Mono.error(new EntityNotFoundException("Could not find request")));
    }

    private Mono<User> getFriendByUser(String userId, String friendId) {
        return userRepository.findFriendByUser(userId, friendId)
            .switchIfEmpty(Mono.error(new EntityNotFoundException("Could not find friend")));
    }

    private Mono<User> getFollowingByUser(String userId, String followedId) {
        return userRepository.findFollowingByUser(userId, followedId)
            .switchIfEmpty(Mono.error(new EntityNotFoundException("Could not find following")));
    }
}
