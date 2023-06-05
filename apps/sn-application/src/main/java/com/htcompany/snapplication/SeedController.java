package com.htcompany.snapplication;

import com.htcompany.snuser.service.ProfileService;
import com.htcompany.snuser.service.UserService;
import org.springframework.data.neo4j.core.ReactiveNeo4jClient;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

@Controller
public class SeedController {

    private final String USERID_1 = "00u3icp6uaMxa2Eby5d7";
    private final String USERID_2 = "00u3ibbqx4rvzMZSK5d7";

    private final ReactiveNeo4jClient neo4jClient;

    private final UserService userService;

    private final ProfileService profileService;

    public SeedController(
        ReactiveNeo4jClient neo4jClient,
        UserService userService,
        ProfileService profileService
    ) {
        this.neo4jClient = neo4jClient;
        this.userService = userService;
        this.profileService = profileService;
    }

    @MutationMapping
    public Mono<Boolean> seedData() {
        return neo4jClient
            .query(String.format(
                "MATCH (u:User {id: '%s'})-[*0..]->(x) DETACH DELETE x",
                USERID_1
            ))
            .run()
            .then(neo4jClient
                .query(String.format(
                    "MATCH (u:User {id: '%s'})-[*0..]->(x) DETACH DELETE x",
                    USERID_2
                )).run()
            )
            .then(neo4jClient.query(String.format("MATCH (u:User {id: '%s'}) DELETE u", USERID_1)).run())
            .then(neo4jClient.query(String.format("MATCH (u:User {id: '%s'}) DELETE u", USERID_2)).run())
            .then(userService.getUserFromOkta(USERID_1))
            .then(userService.getUserFromOkta(USERID_2))
            .then(profileService.getProfileForUser(USERID_1, USERID_1))
            .then(profileService.getProfileForUser(USERID_2, USERID_2))
            .thenReturn(true);
    }
}
