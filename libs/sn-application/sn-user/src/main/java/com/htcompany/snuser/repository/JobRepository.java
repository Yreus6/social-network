package com.htcompany.snuser.repository;

import com.htcompany.sndomain.user.Job;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface JobRepository extends ReactiveNeo4jRepository<Job, String> {

    @Query("MATCH (j:Job)<-[r1:WORKED]-(p:Profile)<-[r2:HAS_PROFILE]-(u:User {id: $userId})\n" +
        "RETURN j, collect(r1), collect(p), collect(r2), collect(u)")
    Flux<Job> findJobsByUser(String userId);

    @Query("MATCH (j:Job {id: $jobId})<-[r1:WORKED]-(p:Profile)<-[r2:HAS_PROFILE]-(u:User {id: $userId})\n" +
        "RETURN j, collect(r1), collect(p), collect(r2), collect(u)")
    Mono<Job> findJobByUser(String userId, String jobId);
}
