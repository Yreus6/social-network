package com.htcompany.snuser.repository;

import com.htcompany.sndomain.user.User;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveNeo4jRepository<User, String> {

    @Query("MATCH (t:User)-[r:REQUEST_FRIEND]->(u:User {id: $userId})\n" +
        "RETURN t, collect(r), collect(u)")
    Flux<User> findFriendRequestsByUser(String userId);

    @Query("MATCH (t:User {id: $targetId})-[r:REQUEST_FRIEND]->(u:User {id: $userId})\n" +
        "RETURN t, collect(r), collect(u)")
    Mono<User> findFriendRequestByUser(String userId, String targetId);

    @Query("MATCH (t:User)<-[r:REQUEST_FRIEND]-(u:User {id: $userId})\n" +
        "RETURN t, collect(r), collect(u)")
    Flux<User> findSentRequestsByUser(String userId);

    @Query("MATCH (t:User {id: $targetId})<-[r:REQUEST_FRIEND]-(u:User {id: $userId})\n" +
        "RETURN t, collect(r), collect(u)")
    Mono<User> findSentRequestByUser(String userId, String targetId);

    @Query("MATCH (f:User)-[r:IS_FRIEND_WITH]->(u:User {id: $userId})\n" +
        "RETURN f, collect(r), collect(u)")
    Flux<User> findFriendsByUser(String userId);

    @Query("MATCH (f:User {id: $friendId})-[r:IS_FRIEND_WITH]->(u:User {id: $userId})\n" +
        "RETURN f, collect(r), collect(u)")
    Mono<User> findFriendByUser(String userId, String friendId);

    @Query("MATCH (f:User)<-[r:FOLLOW]-(u:User {id: $userId})\n" +
        "RETURN f, collect(r), collect(u)")
    Flux<User> findFollowingsByUser(String userId);

    @Query("MATCH (f:User {id: $followedId})<-[r:FOLLOW]-(u:User {id: $userId})\n" +
        "RETURN f, collect(r), collect(u)")
    Mono<User> findFollowingByUser(String userId, String followedId);

    @Query("MATCH (f:User)-[r:FOLLOW]->(u:User {id: $userId})\n" +
        "RETURN f, collect(r), collect(u)")
    Flux<User> findFollowersByUser(String userId);

    @Query("MATCH (f:User)<-[:IS_FRIEND_WITH]-(u1:User {id: $user1Id})\n" +
        "MATCH (f)<-[:IS_FRIEND_WITH]-(u2:User {id: $user2Id})\n" +
        "RETURN f, collect(u1), collect(u2)")
    Flux<User> findMutualFriendsBetweenUsers(String user1Id, String user2Id);
}
