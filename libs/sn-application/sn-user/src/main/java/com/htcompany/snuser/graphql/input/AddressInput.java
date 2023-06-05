package com.htcompany.snuser.graphql.input;

public class AddressInput {

    private final String city;

    private final String region;

    private final String country;

    private final String mode;

    public AddressInput(String city, String region, String country, String mode) {
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

    public String getMode() {
        return mode;
    }
}
