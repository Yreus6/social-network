package com.htcompany.sncommon.security;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Collection;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import reactor.util.context.Context;

class SecurityUtilsUnitTest {

    @Test
    void givenUser_whenLoggedIn_ThenGetCurrentUserLogin() {
        String login = SecurityUtils
            .getCurrentUserLogin().contextWrite(ReactiveSecurityContextHolder.withAuthentication(
                new UsernamePasswordAuthenticationToken("admin", "admin")))
            .block();
        assertThat(login).isEqualTo("admin");
    }

    @Test
    void givenUser_whenLoggedIn_ThenIsAuthenticated() {
        Boolean isAuthenticated = SecurityUtils
            .isAuthenticated().contextWrite(ReactiveSecurityContextHolder.withAuthentication(
                new UsernamePasswordAuthenticationToken("admin", "admin")))
            .block();
        assertThat(isAuthenticated).isTrue();
    }

    @Test
    void givenUser_whenLoggedInAsAnonymous_thenIsNotAuthenticated() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(AuthoritiesConstants.ANONYMOUS));
        Boolean isAuthenticated = SecurityUtils
            .isAuthenticated().contextWrite(
                ReactiveSecurityContextHolder.withAuthentication(
                    new UsernamePasswordAuthenticationToken("admin", "admin", authorities))
            )
            .block();
        assertThat(isAuthenticated).isFalse();
    }

    @Test
    void givenUser_whenLoggedInAsUser_thenCheckCurrentUserAnyOfAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(AuthoritiesConstants.USER));
        Context context = ReactiveSecurityContextHolder.withAuthentication(
            new UsernamePasswordAuthenticationToken("admin", "admin", authorities)
        );
        Boolean hasCurrentUserThisAuthority = SecurityUtils
            .hasCurrentUserAnyOfAuthorities(AuthoritiesConstants.USER, AuthoritiesConstants.ADMIN).contextWrite(context)
            .block();
        assertThat(hasCurrentUserThisAuthority).isTrue();

        hasCurrentUserThisAuthority =
            SecurityUtils
                .hasCurrentUserAnyOfAuthorities(AuthoritiesConstants.ANONYMOUS, AuthoritiesConstants.ADMIN)
                .contextWrite(context)
                .block();
        assertThat(hasCurrentUserThisAuthority).isFalse();
    }

    @Test
    void givenUser_whenLoggedInAsUser_thenCheckCurrentUserNoneOfAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(AuthoritiesConstants.USER));
        Context context = ReactiveSecurityContextHolder.withAuthentication(
            new UsernamePasswordAuthenticationToken("admin", "admin", authorities)
        );
        Boolean hasCurrentUserThisAuthority = SecurityUtils
            .hasCurrentUserNoneOfAuthorities(AuthoritiesConstants.USER, AuthoritiesConstants.ADMIN)
            .contextWrite(context)
            .block();
        assertThat(hasCurrentUserThisAuthority).isFalse();

        hasCurrentUserThisAuthority =
            SecurityUtils
                .hasCurrentUserNoneOfAuthorities(AuthoritiesConstants.ANONYMOUS, AuthoritiesConstants.ADMIN)
                .contextWrite(context)
                .block();
        assertThat(hasCurrentUserThisAuthority).isTrue();
    }

    @Test
    void givenUser_whenLoggedInAsUser_thenCheckCurrentUserThisAuthority() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(AuthoritiesConstants.USER));
        Context context = ReactiveSecurityContextHolder.withAuthentication(
            new UsernamePasswordAuthenticationToken("admin", "admin", authorities)
        );
        Boolean hasCurrentUserThisAuthority = SecurityUtils
            .hasCurrentUserThisAuthority(AuthoritiesConstants.USER).contextWrite(context)
            .block();
        assertThat(hasCurrentUserThisAuthority).isTrue();

        hasCurrentUserThisAuthority =
            SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN)
                .contextWrite(context).block();
        assertThat(hasCurrentUserThisAuthority).isFalse();
    }
}
