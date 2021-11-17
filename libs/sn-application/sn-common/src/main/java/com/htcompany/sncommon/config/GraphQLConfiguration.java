package com.htcompany.sncommon.config;

import com.zhokhov.graphql.datetime.DateScalar;
import graphql.scalar.GraphqlStringCoercing;
import graphql.schema.GraphQLScalarType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

@Configuration
public class GraphQLConfiguration {

    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        GraphQLScalarType datetimeScalar = DateScalar.create("DateTime");
        GraphQLScalarType connectionCursorScalar = GraphQLScalarType.newScalar()
            .name("ConnectionCursor")
            .coercing(new GraphqlStringCoercing())
            .build();

        return (wiringBuilder) -> wiringBuilder.scalar(datetimeScalar)
            .scalar(connectionCursorScalar);
    }
}
