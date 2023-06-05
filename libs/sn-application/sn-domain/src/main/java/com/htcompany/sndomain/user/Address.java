package com.htcompany.sndomain.user;

import com.htcompany.sndomain.shared.PrivacyType;
import java.util.Objects;

public class Address {

    private String city;

    private String region;

    private String country;

    private PrivacyType mode;

    private Address() {
    }

    public Address(String city, String region, String country, PrivacyType mode) {
        this.city = city;
        this.region = region;
        this.country = country;
        this.mode = mode;
    }

    public String getCity() {
        return city;
    }

    public String getRegion() {
        return region;
    }

    public String getCountry() {
        return country;
    }

    public PrivacyType getMode() {
        return mode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(city, address.city) &&
            Objects.equals(region, address.region) &&
            Objects.equals(country, address.country) &&
            mode == address.mode;
    }

    @Override
    public int hashCode() {
        return Objects.hash(city, region, country, mode);
    }

    @Override
    public String toString() {
        return "Address{" +
            "city='" + city + '\'' +
            ", region='" + region + '\'' +
            ", country='" + country + '\'' +
            ", mode=" + mode +
            '}';
    }
}
