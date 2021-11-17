package com.htcompany.snuser.repository;

import com.htcompany.sndomain.user.User;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;

public interface UserRepository extends ReactiveNeo4jRepository<User, String> {
}
