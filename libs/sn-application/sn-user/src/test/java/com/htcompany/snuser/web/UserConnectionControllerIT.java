package com.htcompany.snuser.web;

import static org.assertj.core.api.Assertions.assertThat;

import com.github.javafaker.Faker;
import com.htcompany.sncommon.IntegrationTest;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.config.TestUserContextConfiguration;
import com.htcompany.snuser.repository.UserRepository;
import com.htcompany.snuser.service.UserConnectionService;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.boot.test.tester.AutoConfigureWebGraphQlTester;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.test.context.ContextConfiguration;

@IntegrationTest
@AutoConfigureWebGraphQlTester
@ContextConfiguration(classes = {
    TestUserContextConfiguration.class
})
class UserConnectionControllerIT {

    private static final String USER_ID1 = "1";
    private static final String USER_ID2 = "2";

    private static final String USER_TOKEN = "user";

    @Autowired
    private WebGraphQlTester graphQlTester;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConnectionService connectionService;

    private Faker faker;

    @BeforeEach
    void setUp() {
        faker = new Faker();
        User user1 = User.of(
            USER_ID1, faker.name().username(), faker.internet().emailAddress(),
            faker.name().firstName(), "", faker.name().lastName()
        );
        User user2 = User.of(
            USER_ID2, faker.name().username(), faker.internet().emailAddress(),
            faker.name().firstName(), "", faker.name().lastName()
        );
        userRepository.save(user1).block();
        userRepository.save(user2).block();
    }

    @Test
    void givenUser_whenGetFriends_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        for (int i = 0; i < 100; ++i) {
            User user = User.of(
                UUID.randomUUID().toString(), faker.name().username(), faker.internet().emailAddress(),
                faker.name().firstName(), "", faker.name().lastName()
            );
            user1.friendWith(user);
            user.friendWith(user1);
            userRepository.save(user).block();
        }
        userRepository.save(user1).block();

        this.graphQlTester.queryName("GetFriendsForUser")
            .variable("userId", USER_ID1)
            .variable("first", 20)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getFriends.totalCount").entity(Integer.class)
            .isEqualTo(100)
            .path("getFriends.edges[*].node").entityList(User.class)
            .hasSize(20)
            .path("getFriends.pageInfo.hasNextPage").entity(Boolean.class)
            .isEqualTo(true);
    }

    @Test
    void givenUser_whenCountFriends_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        for (int i = 0; i < 100; ++i) {
            User user = User.of(
                UUID.randomUUID().toString(), faker.name().username(), faker.internet().emailAddress(),
                faker.name().firstName(), "", faker.name().lastName()
            );
            user1.friendWith(user);
            user.friendWith(user1);
            userRepository.save(user).block();
        }
        userRepository.save(user1).block();

        this.graphQlTester.queryName("CountFriendsForUser")
            .variable("userId", USER_ID1)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("countFriends").entity(Integer.class)
            .isEqualTo(100);
    }

    @Test
    void givenUser_whenGetFollowings_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        for (int i = 0; i < 100; ++i) {
            User user = User.of(
                UUID.randomUUID().toString(), faker.name().username(), faker.internet().emailAddress(),
                faker.name().firstName(), "", faker.name().lastName()
            );
            user1.follow(user);
            userRepository.save(user).block();
        }
        userRepository.save(user1).block();

        this.graphQlTester.queryName("GetFollowingsForUser")
            .variable("userId", USER_ID1)
            .variable("first", 20)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getFollowings.totalCount").entity(Integer.class)
            .isEqualTo(100)
            .path("getFollowings.edges[*].node").entityList(User.class)
            .hasSize(20)
            .path("getFollowings.pageInfo.hasNextPage").entity(Boolean.class)
            .isEqualTo(true);
    }

    @Test
    void givenUser_whenGetFollowers_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        for (int i = 0; i < 100; ++i) {
            User user = User.of(
                UUID.randomUUID().toString(), faker.name().username(), faker.internet().emailAddress(),
                faker.name().firstName(), "", faker.name().lastName()
            );
            user.follow(user1);
            userRepository.save(user).block();
        }

        this.graphQlTester.queryName("GetFollowersForUser")
            .variable("userId", USER_ID1)
            .variable("first", 20)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getFollowers.totalCount").entity(Integer.class)
            .isEqualTo(100)
            .path("getFollowers.edges[*].node").entityList(User.class)
            .hasSize(20)
            .path("getFollowers.pageInfo.hasNextPage").entity(Boolean.class)
            .isEqualTo(true);
    }

    @Test
    void givenTwoUsers_whenGetMutualFriends_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        User user2 = userRepository.findById(USER_ID2).block();
        int k = 0;
        for (int i = 0; i < 100; ++i) {
            User user = User.of(
                UUID.randomUUID().toString(), faker.name().username(), faker.internet().emailAddress(),
                faker.name().firstName(), "", faker.name().lastName()
            );
            user1.friendWith(user);
            user.friendWith(user1);
            if (k % 4 == 0) {
                user2.friendWith(user);
                user.friendWith(user2);
            }
            userRepository.save(user).block();
            k++;
        }
        userRepository.save(user1).block();
        userRepository.save(user2).block();

        this.graphQlTester.queryName("GetMutualFriendsForUsers")
            .variable("userId", USER_ID1)
            .variable("otherId", USER_ID2)
            .variable("first", 20)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getMutualFriends.totalCount").entity(Integer.class)
            .isEqualTo(25)
            .path("getMutualFriends.edges[*].node").entityList(User.class)
            .hasSize(20)
            .path("getMutualFriends.pageInfo.hasNextPage").entity(Boolean.class)
            .isEqualTo(true);
    }

    @Test
    void givenTwoUsers_whenCountMutualFriends_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        User user2 = userRepository.findById(USER_ID2).block();
        int k = 0;
        for (int i = 0; i < 100; ++i) {
            User user = User.of(
                UUID.randomUUID().toString(), faker.name().username(), faker.internet().emailAddress(),
                faker.name().firstName(), "", faker.name().lastName()
            );
            user1.friendWith(user);
            user.friendWith(user1);
            if (k % 4 == 0) {
                user2.friendWith(user);
                user.friendWith(user2);
            }
            userRepository.save(user).block();
            k++;
        }
        userRepository.save(user1).block();
        userRepository.save(user2).block();

        this.graphQlTester.queryName("CountMutualFriendsForUsers")
            .variable("userId", USER_ID1)
            .variable("otherId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("countMutualFriends").entity(Integer.class)
            .isEqualTo(25);
    }

    @Test
    void givenUser_whenGetFriendRequests_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        for (int i = 0; i < 100; ++i) {
            User user = User.of(
                UUID.randomUUID().toString(), faker.name().username(), faker.internet().emailAddress(),
                faker.name().firstName(), "", faker.name().lastName()
            );
            user.sendRequest(user1);
            userRepository.save(user).block();
        }

        this.graphQlTester.queryName("GetFriendRequestsForUser")
            .variable("userId", USER_ID1)
            .variable("first", 20)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getFriendRequests.totalCount").entity(Integer.class)
            .isEqualTo(100)
            .path("getFriendRequests.edges[*].node").entityList(User.class)
            .hasSize(20)
            .path("getFriendRequests.pageInfo.hasNextPage").entity(Boolean.class)
            .isEqualTo(true);
    }

    @Test
    void givenUser_whenGetSentRequests_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        for (int i = 0; i < 100; ++i) {
            User user = User.of(
                UUID.randomUUID().toString(), faker.name().username(), faker.internet().emailAddress(),
                faker.name().firstName(), "", faker.name().lastName()
            );
            user1.sendRequest(user);
            userRepository.save(user).block();
        }
        userRepository.save(user1).block();

        this.graphQlTester.queryName("GetSentRequestsForUser")
            .variable("userId", USER_ID1)
            .variable("first", 20)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getSentRequests.totalCount").entity(Integer.class)
            .isEqualTo(100)
            .path("getSentRequests.edges[*].node").entityList(User.class)
            .hasSize(20)
            .path("getSentRequests.pageInfo.hasNextPage").entity(Boolean.class)
            .isEqualTo(true);
    }

    @Test
    void givenUser_whenGetFriendSuggestions_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        User user2 = userRepository.findById(USER_ID2).block();
        for (int i = 0; i < 100; ++i) {
            User user = User.of(
                UUID.randomUUID().toString(), faker.name().username(), faker.internet().emailAddress(),
                faker.name().firstName(), "", faker.name().lastName()
            );
            user1.friendWith(user);
            user.friendWith(user1);
            userRepository.save(user).block();
        }
        user1.friendWith(user2);
        user2.friendWith(user1);
        userRepository.save(user1).block();
        userRepository.save(user2).block();

        this.graphQlTester.queryName("GetFriendSuggestionsForUser")
            .variable("userId", USER_ID2)
            .variable("first", 20)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("getFriendSuggestions.totalCount").entity(Integer.class)
            .isEqualTo(100)
            .path("getFriendSuggestions.edges[*].node").entityList(User.class)
            .hasSize(20)
            .path("getFriendSuggestions.pageInfo.hasNextPage").entity(Boolean.class)
            .isEqualTo(true);
    }

    @Test
    void givenUser_whenSendFriendRequest_thenReturnSuccess() {
        this.graphQlTester.queryName("SendFriendRequestForUser")
            .variable("userId", USER_ID1)
            .variable("targetId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();

        User user2 = userRepository.findSentRequestByUser(USER_ID1, USER_ID2).block();
        assertThat(user2).isNotNull();
    }

    @Test
    void givenUser_whenSendFriendRequestToFriend_thenReturnError() {
        connectionService.sendFriendRequestForUser(USER_ID2, USER_ID1).block();
        connectionService.confirmFriendRequestForUser(USER_ID1, USER_ID2).block();

        this.graphQlTester.queryName("SendFriendRequestForUser")
            .variable("userId", USER_ID1)
            .variable("targetId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .errors()
            .satisfy(errors -> {
                assertThat(errors).hasSize(1);
                assertThat(errors.get(0).getErrorType()).isEqualTo(ErrorType.FORBIDDEN);
            });
    }

    @Test
    void givenUser_whenConfirmFriendRequest_thenReturnSuccess() {
        connectionService.sendFriendRequestForUser(USER_ID2, USER_ID1).block();

        this.graphQlTester.queryName("ConfirmFriendRequestForUser")
            .variable("userId", USER_ID1)
            .variable("targetId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();

        User user2 = userRepository.findFriendByUser(USER_ID1, USER_ID2).block();
        assertThat(user2).isNotNull();
    }

    @Test
    void givenUser_whenDeclineFriendRequest_thenReturnSuccess() {
        connectionService.sendFriendRequestForUser(USER_ID2, USER_ID1).block();

        this.graphQlTester.queryName("DeclineFriendRequestForUser")
            .variable("userId", USER_ID1)
            .variable("targetId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();

        assertThat(userRepository.findFriendByUser(USER_ID1, USER_ID2).block())
            .isNull();
    }

    @Test
    void givenUser_whenCancelSentRequest_thenReturnSuccess() {
        connectionService.sendFriendRequestForUser(USER_ID1, USER_ID2).block();

        this.graphQlTester.queryName("CancelSentRequestForUser")
            .variable("userId", USER_ID1)
            .variable("targetId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();

        assertThat(userRepository.findSentRequestByUser(USER_ID1, USER_ID2).block())
            .isNull();
    }

    @Test
    void givenUser_whenRemoveFriend_thenReturnSuccess() {
        connectionService.sendFriendRequestForUser(USER_ID2, USER_ID1).block();
        connectionService.confirmFriendRequestForUser(USER_ID1, USER_ID2).block();

        this.graphQlTester.queryName("RemoveFriendForUser")
            .variable("userId", USER_ID1)
            .variable("friendId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();

        assertThat(userRepository.findFriendByUser(USER_ID1, USER_ID2).block())
            .isNull();
    }

    @Test
    void givenUser_whenFollowAnotherUser_thenReturnSuccess() {
        this.graphQlTester.queryName("FollowUser")
            .variable("userId", USER_ID1)
            .variable("followedId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();

        assertThat(userRepository.findFollowingByUser(USER_ID1, USER_ID2).block())
            .isNotNull();
    }

    @Test
    void givenUser_whenUnfollowUser_thenReturnSuccess() {
        connectionService.followUser(USER_ID1, USER_ID2).block();

        this.graphQlTester.queryName("UnfollowUser")
            .variable("userId", USER_ID1)
            .variable("followedId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .executeAndVerify();

        assertThat(userRepository.findFollowingByUser(USER_ID1, USER_ID2).block())
            .isNull();
    }

    @Test
    void givenUser_whenCheckFriend_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        User user2 = userRepository.findById(USER_ID2).block();
        user1.friendWith(user2);
        user2.friendWith(user1);

        userRepository.save(user1).block();
        userRepository.save(user2).block();

        this.graphQlTester.queryName("CheckFriendUser")
            .variable("userId", USER_ID1)
            .variable("otherId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("checkFriend").entity(Boolean.class)
            .isEqualTo(true);
    }

    @Test
    void givenUser_whenCheckFollowing_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        User user2 = userRepository.findById(USER_ID2).block();
        user1.follow(user2);

        userRepository.save(user1).block();

        this.graphQlTester.queryName("CheckFollowingUser")
            .variable("userId", USER_ID1)
            .variable("otherId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("checkFollowing").entity(Boolean.class)
            .isEqualTo(true);
    }

    @Test
    void givenUser_whenCheckRequestFriend_thenReturnSuccess() {
        User user1 = userRepository.findById(USER_ID1).block();
        User user2 = userRepository.findById(USER_ID2).block();
        user1.sendRequest(user2);

        userRepository.save(user1).block();

        this.graphQlTester.queryName("CheckRequestFriendUser")
            .variable("userId", USER_ID1)
            .variable("otherId", USER_ID2)
            .httpHeaders(headers -> headers.setBearerAuth(USER_TOKEN))
            .execute()
            .path("checkRequestFriend").entity(Boolean.class)
            .isEqualTo(true);
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll().block();
    }
}
