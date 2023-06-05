package com.htcompany.snuser.repository;

import com.htcompany.sndomain.user.Education;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface EducationRepository extends ReactiveNeo4jRepository<Education, String> {

    @Query("MATCH (e:Education)<-[r1:STUDIED]-(p:Profile)<-[r2:HAS_PROFILE]-(u:User {id: $userId})\n" +
        "RETURN e, collect(r1), collect(p), collect(r2), collect(u)")
    Flux<Education> findEducationsForUser(String userId);

    @Query(
        "MATCH (e:Education {id: $educationId})<-[r1:STUDIED]-(p:Profile)<-[r2:HAS_PROFILE]-(u:User {id: $userId})\n" +
            "RETURN e, collect(r1), collect(p), collect(r2), collect(u)")
    Mono<Education> findEducationByUser(String userId, String educationId);
}
