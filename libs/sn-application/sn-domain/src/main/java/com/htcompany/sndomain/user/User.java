package com.htcompany.sndomain.user;

import java.util.Objects;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;

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

    private User() {
    }

    private User(String id, String username, String email, String firstName, String middleName, String lastName) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
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

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    private void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    private void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    private void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    private void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(username, user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username);
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
