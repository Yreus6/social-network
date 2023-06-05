package com.htcompany.snuser.repository;

import com.htcompany.sndomain.user.Profile;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import reactor.core.publisher.Mono;

public interface ProfileRepository extends ReactiveNeo4jRepository<Profile, String> {

    @Query("MATCH (p:Profile)<-[r:HAS_PROFILE]-(u:User {id: $userId})\n" +
        "RETURN p, collect(r), collect(u)")
    Mono<Profile> getProfileByUser(String userId);
}
