package com.htcompany.sndomain.user;

import com.htcompany.sndomain.DateRangeConverter;
import com.htcompany.sndomain.shared.DateRange;
import com.htcompany.sndomain.shared.PrivacyType;
import java.util.Objects;
import org.springframework.data.neo4j.core.convert.ConvertWith;
import org.springframework.data.neo4j.core.schema.*;
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

    @Property(name = "is_current_work")
    private Boolean isCurrentWork;

    @ConvertWith(converter = DateRangeConverter.class)
    private DateRange dateRange;

    private PrivacyType mode;

    public static Job of(
        String company, String position, String city, String description,
        Boolean isCurrentWork, DateRange dateRange, PrivacyType mode) {
        return new Job(null, company, position, city, description, isCurrentWork, dateRange, mode);
    }

    private Job() {
    }

    private Job(
        String id, String company, String position, String city, String description,
        Boolean isCurrentWork, DateRange dateRange, PrivacyType mode) {
        this.id = id;
        this.company = company;
        this.position = position;
        this.city = city;
        this.description = description;
        this.isCurrentWork = isCurrentWork;
        this.dateRange = dateRange;
        this.mode = mode;
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
        if (another.getIsCurrentWork() != null) {
            this.setIsCurrentWork(another.getIsCurrentWork());
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

    public String getPosition() {
        return position;
    }

    public String getCity() {
        return city;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getIsCurrentWork() {
        return isCurrentWork;
    }

    public DateRange getDateRange() {
        return dateRange;
    }

    public PrivacyType getMode() {
        return mode;
    }

    private void setCompany(String company) {
        this.company = company;
    }

    private void setPosition(String position) {
        this.position = position;
    }

    private void setCity(String city) {
        this.city = city;
    }

    private void setDescription(String description) {
        this.description = description;
    }

    private void setIsCurrentWork(Boolean isCurrentWork) {
        this.isCurrentWork = isCurrentWork;
    }

    private void setDateRange(DateRange dateRange) {
        this.dateRange = dateRange;
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
            ", isCurrentWork='" + isCurrentWork + '\'' +
            ", dateRange=" + dateRange +
            ", mode=" + mode +
            '}';
    }
}
