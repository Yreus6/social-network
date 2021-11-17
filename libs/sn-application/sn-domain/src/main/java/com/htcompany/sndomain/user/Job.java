package com.htcompany.sndomain.user;

import com.htcompany.sndomain.DateRangeConverter;
import com.htcompany.sndomain.shared.DateRange;
import com.htcompany.sndomain.shared.PrivacyType;
import java.util.Objects;
import org.springframework.data.neo4j.core.convert.ConvertWith;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

@Node
public class Job {

    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;

    private String company;

    private String position;

    private String city;

    private String description;

    @ConvertWith(converter = DateRangeConverter.class)
    private DateRange dateRange;

    private PrivacyType mode;

    private Job() {
    }

    private Job(
        String id, String company, String position, String city, String description,
        DateRange dateRange, PrivacyType mode) {
        this.id = id;
        this.company = company;
        this.position = position;
        this.city = city;
        this.description = description;
        this.dateRange = dateRange;
        this.mode = mode;
    }

    public static Job of(
        String company, String position, String city, String description,
        DateRange dateRange, PrivacyType mode) {
        return new Job(null, company, position, city, description, dateRange, mode);
    }

    public void updateWith(Job another) {
        if (another.getCompany() != null) {
            this.setCompany(another.getCompany());
        }
        if (another.getPosition() != null) {
            this.setPosition(another.getPosition());
        }
        if (another.getCity() != null) {
            this.setCity(another.getCity());
        }
        if (another.getDescription() != null) {
            this.setDescription(another.getDescription());
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

    public String getCompany() {
        return company;
    }

    private void setCompany(String company) {
        this.company = company;
    }

    public String getPosition() {
        return position;
    }

    private void setPosition(String position) {
        this.position = position;
    }

    public String getCity() {
        return city;
    }

    private void setCity(String city) {
        this.city = city;
    }

    public String getDescription() {
        return description;
    }

    private void setDescription(String description) {
        this.description = description;
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
        Job job = (Job) o;
        return Objects.equals(id, job.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Job{" +
            "id='" + id + '\'' +
            ", company='" + company + '\'' +
            ", position='" + position + '\'' +
            ", city='" + city + '\'' +
            ", description='" + description + '\'' +
            ", dateRange=" + dateRange +
            ", mode=" + mode +
            '}';
    }
}
