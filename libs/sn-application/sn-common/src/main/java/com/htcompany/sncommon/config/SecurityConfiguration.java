package com.htcompany.sncommon.config;

import com.htcompany.sncommon.security.AuthoritiesConstants;
import com.htcompany.sncommon.security.oauth2.JwtGrantedAuthorityConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.zalando.problem.spring.webflux.advice.security.SecurityProblemSupport;
import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
@Import({ SecurityProblemSupport.class })
public class SecurityConfiguration {

    private final SecurityProblemSupport problemSupport;

    public SecurityConfiguration(SecurityProblemSupport problemSupport) {
        this.problemSupport = problemSupport;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        // @formatter:off
        http.csrf().disable()
            .exceptionHandling()
                .authenticationEntryPoint(problemSupport)
                .accessDeniedHandler(problemSupport)
            .and()
                .authorizeExchange()
                    .pathMatchers("/actuator/health").permitAll()
                    .pathMatchers("/actuator/health/**").permitAll()
                    .pathMatchers("/graphiql", "/graphql").permitAll()
                    .pathMatchers("/actuator/**").hasAuthority(AuthoritiesConstants.ADMIN)
                    .anyExchange().authenticated()
            .and()
                .oauth2ResourceServer()
                    .jwt().jwtAuthenticationConverter(jwtAuthenticationConverter());
        // @formatter:on

        return http.build();
    }

    public Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(new JwtGrantedAuthorityConverter());

        return new ReactiveJwtAuthenticationConverterAdapter(jwtAuthenticationConverter);
    }
}
