package com.htcompany.sndomain.user;

import com.htcompany.sndomain.DateRangeConverter;
import com.htcompany.sndomain.shared.DateRange;
import com.htcompany.sndomain.shared.PrivacyType;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import org.springframework.data.neo4j.core.convert.ConvertWith;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

@Node
public class Education {

    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;

    private String school;

    @Property(name = "is_graduate")
    private Boolean isGraduate;

    private String description;

    private Set<String> concentrations;

    private String degree;

    @ConvertWith(converter = DateRangeConverter.class)
    private DateRange dateRange;

    private PrivacyType mode;

    private Education() {
    }

    private Education(
        String id, String school, Boolean isGraduate, String description, String degree,
        Set<String> concentrations, DateRange dateRange, PrivacyType mode) {
        this.id = id;
        this.school = school;
        this.isGraduate = isGraduate;
        this.description = description;
        this.degree = degree;
        this.dateRange = dateRange;
        this.mode = mode;
        this.concentrations = concentrations;
    }

    public static Education of(
        String school, Boolean isGraduate, String description, String degree,
        Set<String> concentrations, DateRange dateRange, PrivacyType mode) {
        return new Education(
            null, school, isGraduate, description, degree, concentrations, dateRange, mode
        );
    }

    public void updateWith(Education another) {
        if (another.getSchool() != null) {
            this.setSchool(another.getSchool());
        }
        if (another.getIsGraduate() != null) {
            this.setIsGraduate(another.getIsGraduate());
        }
        if (another.getDescription() != null) {
            this.setDescription(another.getDescription());
        }
        if (another.getConcentrations() != null) {
            this.setConcentrations(another.getConcentrations());
        }
        if (another.getDegree() != null) {
            this.setDegree(another.getDegree());
        }
        if (another.getDateRange() != null) {
            this.setDateRange(another.getDateRange());
        }
        if (another.getMode() != null) {
            this.setMode(another.getMode());
        }
    }

    public String getId() {
        return id;
    }

    public String getSchool() {
        return school;
    }

    private void setSchool(String school) {
        this.school = school;
    }

    public Boolean getIsGraduate() {
        return isGraduate;
    }

    private void setIsGraduate(Boolean isGraduate) {
        this.isGraduate = isGraduate;
    }

    public String getDescription() {
        return description;
    }

    private void setDescription(String description) {
        this.description = description;
    }

    public Set<String> getConcentrations() {
        return Collections.unmodifiableSet(concentrations);
    }

    private void setConcentrations(Set<String> concentrations) {
        this.concentrations = concentrations;
    }

    public String getDegree() {
        return degree;
    }

    private void setDegree(String degree) {
        this.degree = degree;
    }

    public DateRange getDateRange() {
        return dateRange;
    }

    private void setDateRange(DateRange dateRange) {
        this.dateRange = dateRange;
    }

    public PrivacyType getMode() {
        return mode;
    }

    private void setMode(PrivacyType mode) {
        this.mode = mode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Education education = (Education) o;
        return Objects.equals(id, education.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Education{" +
            "id='" + id + '\'' +
            ", school='" + school + '\'' +
            ", isGraduate=" + isGraduate +
            ", description='" + description + '\'' +
            ", concentrations=" + concentrations +
            ", degree='" + degree + '\'' +
            ", dateRange=" + dateRange +
            ", mode=" + mode +
            '}';
    }
}
