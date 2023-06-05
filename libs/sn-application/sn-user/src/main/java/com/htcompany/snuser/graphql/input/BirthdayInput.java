package com.htcompany.snuser.graphql.input;

public class BirthdayInput {

    private final String birthdate;

    private final String mode;

    public BirthdayInput(String birthdate, String mode) {
        this.birthdate = birthdate;
        this.mode = mode;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public String getMode() {
        return mode;
    }
}
