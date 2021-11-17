package com.htcompany.sncommon.security;

import com.htcompany.sncommon.exception.ForbiddenException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import reactor.core.publisher.Mono;

public class SecurityUtils {

    public static final String CLAIMS_NAMESPACE = "https://login.dev4fun.online";

    private SecurityUtils() {
    }

    public static List<GrantedAuthority> extractAuthorityFromClaims(Map<String, Object> claims) {
        return mapRolesToGrantedAuthorities(getRolesFromClaims(claims));
    }

    @SuppressWarnings("unchecked")
    private static Collection<String> getRolesFromClaims(Map<String, Object> claims) {
        return (Collection<String>) claims.getOrDefault(
            "groups",
            claims.getOrDefault("roles", claims.getOrDefault(CLAIMS_NAMESPACE + "roles", new ArrayList<>()))
        );
    }

    private static List<GrantedAuthority> mapRolesToGrantedAuthorities(Collection<String> roles) {
        return roles.stream().filter(role -> role.startsWith("ROLE_")).map(
            SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    public static Mono<?> checkUser(String userId1, String userId2, Supplier<Mono<?>> cb) {
        if (userId1.equals(userId2)) {
            return cb.get();
        } else {
            return Mono.error(new ForbiddenException("Not Allowed"));
        }
    }
}
