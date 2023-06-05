package com.htcompany.sndomain.user;

import com.htcompany.sndomain.shared.PrivacyType;
import java.util.Date;
import java.util.Objects;

public class Birthday {

    private Date birthdate;

    private PrivacyType mode;

    private Birthday() {
    }

    public Birthday(Date birthdate, PrivacyType mode) {
        this.birthdate = birthdate;
        this.mode = mode;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public PrivacyType getMode() {
        return mode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Birthday birthday = (Birthday) o;
        return Objects.equals(birthdate, birthday.birthdate) && mode == birthday.mode;
    }

    @Override
    public int hashCode() {
        return Objects.hash(birthdate, mode);
    }

    @Override
    public String toString() {
        return "Birthday{" +
            "birthdate=" + birthdate +
            ", mode=" + mode +
            '}';
    }
}
