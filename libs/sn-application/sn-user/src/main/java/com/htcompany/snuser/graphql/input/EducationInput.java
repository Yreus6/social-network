package com.htcompany.snuser.graphql.input;

import java.util.List;

public class EducationInput {

    private final String school;

    private final Boolean isGraduate;

    private final String description;

    private final List<String> concentrations;

    private final String degree;

    private final String fromDate;

    private final String toDate;

    private final String mode;

    public EducationInput(
        String school, Boolean isGraduate, String description,
        List<String> concentrations, String degree, String fromDate, String toDate, String mode) {
        this.school = school;
        this.isGraduate = isGraduate;
        this.description = description;
        this.concentrations = concentrations;
        this.degree = degree;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.mode = mode;
    }

    public String getSchool() {
        return school;
    }

    public Boolean getIsGraduate() {
        return isGraduate;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getConcentrations() {
        return concentrations;
    }

    public String getDegree() {
        return degree;
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
