package com.htcompany.snuser.service;

import com.htcompany.sncommon.exception.EntityNotFoundException;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.graphql.input.NameInput;
import com.htcompany.snuser.graphql.input.PasswordInput;
import com.htcompany.snuser.repository.UserRepository;
import com.htcompany.snuser.service.mapper.UserMapper;
import com.okta.sdk.client.Client;
import com.okta.sdk.resource.user.ChangePasswordRequest;
import com.okta.sdk.resource.user.PasswordCredential;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserService {

    private final Client oktaClient;

    private final UserRepository userRepository;

    private final UserMapper mapper;

    public UserService(Client oktaClient, UserRepository userRepository, UserMapper mapper) {
        this.oktaClient = oktaClient;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    public Mono<User> getUserFromOkta(String userId) {
        com.okta.sdk.resource.user.User oktaUser = oktaClient.getUser(userId);
        User user = mapper.userFromOkta(oktaUser);

        return userRepository.findById(userId)
            .flatMap(found -> {
                if (found.equals(user)) {
                    return Mono.just(found);
                }

                return userRepository.save(user);
            })
            .switchIfEmpty(userRepository.save(user));
    }

    public Mono<User> changeNameForUser(String userId, NameInput nameInput) {
        return getUserById(userId)
            .flatMap(user -> {
                com.okta.sdk.resource.user.User oktaUser = oktaClient.getUser(userId);
                oktaUser.getProfile().setFirstName(nameInput.getFirstName());
                oktaUser.getProfile().setMiddleName(nameInput.getMiddleName());
                oktaUser.getProfile().setLastName(nameInput.getLastName());
                oktaUser.update();

                user.changeName(
                    nameInput.getFirstName(),
                    nameInput.getMiddleName(),
                    nameInput.getLastName()
                );

                return userRepository.save(user);
            });
    }

    public Mono<User> changeEmailForUser(String userId, String email) {
        return getUserById(userId)
            .flatMap(user -> {
                com.okta.sdk.resource.user.User oktaUser = oktaClient.getUser(userId);
                oktaUser.getProfile().setEmail(email);
                oktaUser.getProfile().setLogin(email);
                oktaUser.update();

                user.changeEmail(email);

                return userRepository.save(user);
            });
    }

    public Mono<User> changePasswordForUser(String userId, PasswordInput passwordInput) {
        return getUserById(userId)
            .map(user -> {
                com.okta.sdk.resource.user.User oktaUser = oktaClient.getUser(userId);
                oktaUser.changePassword(
                    oktaClient.instantiate(ChangePasswordRequest.class)
                        .setOldPassword(oktaClient.instantiate(PasswordCredential.class)
                                            .setValue(passwordInput.getOldPassword().toCharArray()))
                        .setNewPassword(oktaClient.instantiate(PasswordCredential.class)
                                            .setValue(passwordInput.getNewPassword().toCharArray()))
                );
                oktaUser.update();

                return user;
            });
    }

    public Mono<User> deactivateUser(String userId) {
        return getUserById(userId)
            .map(user -> {
                com.okta.sdk.resource.user.User oktaUser = oktaClient.getUser(userId);
                oktaUser.deactivate(true);

                return user;
            });
    }

    protected Mono<User> getUserById(String id) {
        return userRepository.findById(id)
            .switchIfEmpty(
                Mono.error(new EntityNotFoundException("Could not find user"))
            );
    }
}
