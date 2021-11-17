package com.htcompany.sndomain.shared;

import java.util.Date;
import java.util.Objects;

public class DateRange {

    private Date fromDate;

    private Date toDate;

    private DateRange() {
    }

    public DateRange(Date fromDate, Date toDate) {
        this.fromDate = fromDate;
        this.toDate = toDate;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DateRange dateRange = (DateRange) o;
        return Objects.equals(fromDate, dateRange.fromDate) && Objects.equals(toDate, dateRange.toDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fromDate, toDate);
    }

    @Override
    public String toString() {
        return "DateRange{" +
            "fromDate=" + fromDate +
            ", toDate=" + toDate +
            '}';
    }
}
