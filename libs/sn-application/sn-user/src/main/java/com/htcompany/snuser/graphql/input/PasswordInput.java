package com.htcompany.snuser.graphql.input;

public class PasswordInput {

    private final String oldPassword;

    private final String newPassword;

    public PasswordInput(String oldPassword, String newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }
}
