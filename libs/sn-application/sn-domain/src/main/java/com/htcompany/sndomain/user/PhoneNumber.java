package com.htcompany.sndomain.user;

import com.htcompany.sndomain.shared.PrivacyType;
import java.util.Objects;

public class PhoneNumber {

    private String phone;

    private PrivacyType mode;

    private PhoneNumber() {
    }

    public PhoneNumber(String phone, PrivacyType mode) {
        this.phone = phone;
        this.mode = mode;
    }

    public String getPhone() {
        return phone;
    }

    public PrivacyType getMode() {
        return mode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhoneNumber that = (PhoneNumber) o;
        return Objects.equals(phone, that.phone) && mode == that.mode;
    }

    @Override
    public int hashCode() {
        return Objects.hash(phone, mode);
    }

    @Override
    public String toString() {
        return "PhoneNumber{" +
            "phone='" + phone + '\'' +
            ", mode=" + mode +
            '}';
    }
}
