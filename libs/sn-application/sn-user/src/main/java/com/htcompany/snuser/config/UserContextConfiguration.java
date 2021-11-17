package com.htcompany.snuser.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.repository.config.EnableReactiveNeo4jRepositories;

@Configuration
@EnableReactiveNeo4jRepositories(basePackages = {
    "com.htcompany.sndomain",
    "com.htcompany.snuser"
})
public class UserContextConfiguration {
}
