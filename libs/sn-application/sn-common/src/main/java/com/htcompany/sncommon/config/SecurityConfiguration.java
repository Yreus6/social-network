package com.htcompany.sncommon.config;

import com.htcompany.sncommon.security.AuthoritiesConstants;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.zalando.problem.spring.webflux.advice.security.SecurityProblemSupport;

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
@Import({ SecurityProblemSupport.class })
public class SecurityConfiguration {

    private final ApplicationProperties applicationProperties;

    private final SecurityProblemSupport problemSupport;

    public SecurityConfiguration(
        ApplicationProperties applicationProperties,
        SecurityProblemSupport problemSupport
    ) {
        this.applicationProperties = applicationProperties;
        this.problemSupport = problemSupport;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        // @formatter:off
        http
            .exceptionHandling()
                .authenticationEntryPoint(problemSupport)
                .accessDeniedHandler(problemSupport)
            .and()
                .authorizeExchange()
                    .pathMatchers("/management/health").permitAll()
                    .pathMatchers("/management/health/**").permitAll()
                    .pathMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
                    .anyExchange().authenticated()
            .and()
                .oauth2ResourceServer()
                    .jwt();
        // @formatter:on

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(applicationProperties.getCors().getAllowedOrigins());
        configuration.setAllowedMethods(applicationProperties.getCors().getAllowedMethods());
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
