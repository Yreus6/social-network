package com.htcompany.snuser.graphql.input;

public class JobInput {

    private final String company;

    private final String position;

    private final String city;

    private final String description;

    private final String fromDate;

    private final String toDate;

    private final String mode;

    public JobInput(
        String company, String position, String city, String description,
        String fromDate, String toDate, String mode) {
        this.company = company;
        this.position = position;
        this.city = city;
        this.description = description;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.mode = mode;
    }

    public String getCompany() {
        return company;
    }

    public String getPosition() {
        return position;
    }

    public String getCity() {
        return city;
    }

    public String getDescription() {
        return description;
    }

    public String getFromDate() {
        return fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public String getMode() {
        return mode;
    }
}
