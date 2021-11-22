package com.htcompany.sndomain.user;

import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import org.springframework.data.annotation.Version;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node
public class User {

    @Id
    private String id;

    private String username;

    private String email;

    @Property(name = "first_name")
    private String firstName;

    @Property(name = "middle_name")
    private String middleName;

    @Property(name = "last_name")
    private String lastName;

    @Relationship(type = "REQUEST_FRIEND")
    private Set<User> sentRequests;

    @Relationship(type = "IS_FRIEND_WITH")
    private Set<User> friends;

    @Relationship(type = "FOLLOW")
    private Set<User> followings;

    @Version
    private Long version;

    private User(String id, String username, String email, String firstName, String middleName, String lastName) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.sentRequests = new HashSet<>();
        this.friends = new HashSet<>();
        this.followings = new HashSet<>();
    }

    private User() {
    }

    public static User of(String id, String username, String email, String firstName, String middleName,
                          String lastName) {
        return new User(id, username, email, firstName, middleName, lastName);
    }

    public void changeName(String aFirstName, String aMiddleName, String aLastName) {
        this.setFirstName(aFirstName);
        this.setMiddleName(aMiddleName);
        this.setLastName(aLastName);
    }

    public void changeEmail(String anEmail) {
        this.setEmail(anEmail);
    }

    public void sendRequest(User target) {
        if (isNotSelf(target)) {
            sentRequests.add(target);
        }
    }

    public void removeSentRequest(User target) {
        sentRequests.remove(target);
    }

    public void friendWith(User target) {
        if (isNotSelf(target)) {
            friends.add(target);
        }
    }

    public void removeFriend(User friend) {
        friends.remove(friend);
    }

    public void follow(User target) {
        if (isNotSelf(target)) {
            followings.add(target);
        }
    }

    public void unfollow(User target) {
        followings.remove(target);
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public Set<User> getSentRequests() {
        return Collections.unmodifiableSet(sentRequests);
    }

    public Set<User> getFriends() {
        return Collections.unmodifiableSet(friends);
    }

    public Set<User> getFollowings() {
        return Collections.unmodifiableSet(followings);
    }

    private void setEmail(String email) {
        this.email = email;
    }

    private void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    private void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    private void setLastName(String lastName) {
        this.lastName = lastName;
    }

    private void setVersion(Long version) {
        this.version = version;
    }

    private boolean isNotSelf(User u) {
        return !this.getId().equals(u.getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &&
            Objects.equals(username, user.username) &&
            Objects.equals(email, user.email) &&
            Objects.equals(firstName, user.firstName) &&
            Objects.equals(middleName, user.middleName) &&
            Objects.equals(lastName, user.lastName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, email, firstName, middleName, lastName);
    }

    @Override
    public String toString() {
        return "User{" +
            "id='" + id + '\'' +
            ", username='" + username + '\'' +
            ", email='" + email + '\'' +
            ", firstName='" + firstName + '\'' +
            ", middleName='" + middleName + '\'' +
            ", lastName='" + lastName + '\'' +
            '}';
    }
}
