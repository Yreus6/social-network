package com.htcompany.snuser.graphql.input;

public class PhoneInput {

    private final String phone;

    private final String mode;

    public PhoneInput(String phone, String mode) {
        this.phone = phone;
        this.mode = mode;
    }

    public String getPhone() {
        return phone;
    }

    public String getMode() {
        return mode;
    }
}
