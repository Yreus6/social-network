package com.htcompany.sndomain.shared;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

class DateRangeServiceTest {

    @Test
    void givenValidFromToDate_whenCreateDateRange_thenReturnDateRange() {
        DateRange dateRange = DateRangeService.createDateRange(
            "2011-12-03T10:15:30Z", "2012-12-03T10:15:30Z"
        );

        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getFromDate()).hasYear(2011);
        assertThat(dateRange.getToDate()).hasYear(2012);
    }

    @Test
    void givenInvalidFromToDate_whenCreateDateRange_thenReturnError() {
        assertThatThrownBy(() -> DateRangeService.createDateRange(
            "2011-12-03T10:15:30Z", "2010-12-03T10:15:30Z"
        )).hasMessage("Invalid end date");
    }
}
