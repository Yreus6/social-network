package com.htcompany.sndomain.shared;

import com.htcompany.sncommon.utils.DateUtils;
import java.util.Date;

public class DateRangeService {

    public static DateRange createDateRange(String from, String to) {
        Date fromDate = DateUtils.createDate(from);
        Date toDate = DateUtils.createDate(to);
        if (toDate.before(fromDate)) {
            throw new IllegalArgumentException("Invalid end date");
        }

        return new DateRange(fromDate, toDate);
    }
}
