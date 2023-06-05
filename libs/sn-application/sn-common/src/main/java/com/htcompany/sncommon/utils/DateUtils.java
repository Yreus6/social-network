package com.htcompany.sncommon.utils;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateUtils {

    private static final DateTimeFormatter dtf = DateTimeFormatter.ISO_INSTANT;

    public static Date createDate(String dateStr) {
        return Date.from(Instant.from(dtf.parse(dateStr)));
    }
}
