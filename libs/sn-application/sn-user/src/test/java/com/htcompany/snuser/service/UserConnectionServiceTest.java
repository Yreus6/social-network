package com.htcompany.snuser.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.github.javafaker.Faker;
import com.htcompany.sncommon.exception.EntityNotFoundException;
import com.htcompany.sncommon.exception.ForbiddenException;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;

@ExtendWith(MockitoExtension.class)
class UserConnectionServiceTest {

    private static final String USER_ID1 = "1";
    private static final String USER_ID2 = "2";

    @Mock
    private UserRepository userRepository;

    private UserConnectionService connectionService;

    @BeforeEach
    void setUp() {
        Faker faker = new Faker();
        connectionService = new UserConnectionService(userRepository);

        User user1 = User.of(
            USER_ID1, "test", faker.internet().emailAddress(),
            faker.name().firstName(), "", faker.name().lastName()
        );
        User user2 = User.of(
            USER_ID2, "test1", faker.internet().emailAddress(),
            faker.name().firstName(), "", faker.name().lastName()
        );

        Mockito.lenient().when(userRepository.findById(USER_ID1)).thenReturn(Mono.just(user1));
        Mockito.lenient().when(userRepository.findById(USER_ID2)).thenReturn(Mono.just(user2));
        Mockito.lenient().when(userRepository.save(user1)).thenReturn(Mono.just(user1));

        user2.sendRequest(user1);
        Mockito.lenient().when(userRepository.findFriendByUser(USER_ID1, USER_ID2))
            .thenReturn(Mono.empty());
        Mockito.lenient().when(userRepository.findFollowingByUser(USER_ID1, USER_ID2))
            .thenReturn(Mono.empty());
        Mockito.lenient().when(userRepository.findFriendRequestByUser(USER_ID1, USER_ID2))
            .thenReturn(Mono.just(user2));
        Mockito.lenient().when(userRepository.findSentRequestByUser(USER_ID2, USER_ID1))
            .thenReturn(Mono.just(user1));
        Mockito.lenient().when(userRepository.save(user2)).thenReturn(Mono.just(user2));
    }

    @Test
    void givenUser_whenSendFriendRequest_thenReturnSuccess() {
        Mockito.lenient().when(userRepository.findSentRequestByUser(USER_ID2, USER_ID1))
            .thenReturn(Mono.empty());
        User user = connectionService.sendFriendRequestForUser(USER_ID1, USER_ID2).block();

        assertThat(user).isNotNull();
        assertThat(user.getSentRequests()).map(User::getId).contains(USER_ID2);
    }

    @Test
    void givenUser_whenSendFriendRequestToFriend_thenReturnError() {
        connectionService.confirmFriendRequestForUser(USER_ID1, USER_ID2).block();
        User user2 = userRepository.findById(USER_ID2).block();
        Mockito.when(userRepository.findFriendByUser(USER_ID1, USER_ID2))
            .thenReturn(Mono.just(user2));

        assertThatThrownBy(() -> connectionService.sendFriendRequestForUser(USER_ID1, USER_ID2).block())
            .isInstanceOf(ForbiddenException.class);
    }

    @Test
    void givenUser_whenSendFriendRequestToRequestingUser_thenReturnError() {
        assertThatThrownBy(() -> connectionService.sendFriendRequestForUser(USER_ID1, USER_ID2).block())
            .isInstanceOf(ForbiddenException.class);
    }

    @Test
    void givenUser_whenConfirmFriendRequest_thenReturnSuccess() {
        User user = connectionService.confirmFriendRequestForUser(USER_ID1, USER_ID2).block();

        assertThat(user).isNotNull();
        assertThat(user.getFriends()).map(User::getId).contains(USER_ID2);
        assertThat(user.getFollowings()).map(User::getId).contains(USER_ID2);
    }

    @Test
    void givenUser_whenConfirmNotExistFriendRequest_thenReturnError() {
        Mockito.when(userRepository.findFriendRequestByUser(USER_ID1, USER_ID2))
            .thenReturn(Mono.empty());

        assertThatThrownBy(() -> connectionService.confirmFriendRequestForUser(USER_ID1, USER_ID2).block())
            .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void givenUser_whenDeclineFriendRequest_thenReturnSuccess() {
        User user = connectionService.declineFriendRequestForUser(USER_ID1, USER_ID2).block();

        assertThat(user).isNotNull();
        assertThat(user.getFriends()).map(User::getId).doesNotContain(USER_ID2);
        assertThat(user.getFollowings()).map(User::getId).doesNotContain(USER_ID2);
    }

    @Test
    void givenUser_whenCancelSentRequest_thenReturnSuccess() {
        User user = connectionService.cancelSentRequestForUser(USER_ID2, USER_ID1).block();

        assertThat(user).isNotNull();
        assertThat(user.getSentRequests()).map(User::getId).doesNotContain(USER_ID1);
    }

    @Test
    void givenUser_whenCancelNotExistSentRequest_thenReturnError() {
        Mockito.when(userRepository.findSentRequestByUser(USER_ID2, USER_ID1))
            .thenReturn(Mono.empty());

        assertThatThrownBy(() -> connectionService.cancelSentRequestForUser(USER_ID2, USER_ID1).block())
            .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void givenUser_whenRemoveFriend_thenReturnSuccess() {
        connectionService.confirmFriendRequestForUser(USER_ID1, USER_ID2).block();
        User user2 = userRepository.findById(USER_ID2).block();
        Mockito.when(userRepository.findFriendByUser(USER_ID1, USER_ID2))
            .thenReturn(Mono.just(user2));

        User user1 = connectionService.removeFriendForUser(USER_ID1, USER_ID2).block();

        assertThat(user1).isNotNull();
        assertThat(user1.getFriends()).map(User::getId).doesNotContain(USER_ID2);
        assertThat(user1.getFollowings()).map(User::getId).doesNotContain(USER_ID2);
    }

    @Test
    void givenUser_whenRemoveNotExistFriend_thenReturnError() {
        assertThatThrownBy(() -> connectionService.removeFriendForUser(USER_ID1, USER_ID2).block())
            .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void givenUser_whenFollowAnotherUser_thenReturnSuccess() {
        User user = connectionService.followUser(USER_ID1, USER_ID2).block();

        assertThat(user).isNotNull();
        assertThat(user.getFollowings()).map(User::getId).contains(USER_ID2);
    }

    @Test
    void givenUser_whenUnfollowAnotherUser_thenReturnSuccess() {
        connectionService.followUser(USER_ID1, USER_ID2).block();
        User user2 = userRepository.findById(USER_ID2).block();
        Mockito.when(userRepository.findFollowingByUser(USER_ID1, USER_ID2))
            .thenReturn(Mono.just(user2));
        User user1 = connectionService.unfollowUser(USER_ID1, USER_ID2).block();

        assertThat(user1).isNotNull();
        assertThat(user1.getFollowings()).map(User::getId).doesNotContain(USER_ID2);
    }

    @Test
    void givenUser_whenUnfollowNotFollowedUser_thenReturnError() {
        assertThatThrownBy(() -> connectionService.unfollowUser(USER_ID1, USER_ID2).block())
            .isInstanceOf(EntityNotFoundException.class);
    }
}
