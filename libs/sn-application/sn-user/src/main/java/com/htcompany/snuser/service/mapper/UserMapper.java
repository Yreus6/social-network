package com.htcompany.snuser.service.mapper;

import com.htcompany.sndomain.user.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public User userFromOkta(com.okta.sdk.resource.user.User oktaUser) {
        if (oktaUser == null) {
            return null;
        }
        User user = User.of(
            oktaUser.getId(),
            oktaUser.getProfile().getLogin(),
            oktaUser.getProfile().getEmail(),
            oktaUser.getProfile().getFirstName(),
            oktaUser.getProfile().getMiddleName(),
            oktaUser.getProfile().getLastName()
        );

        return user;
    }
}
