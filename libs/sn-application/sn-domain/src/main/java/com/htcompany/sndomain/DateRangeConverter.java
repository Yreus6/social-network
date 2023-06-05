package com.htcompany.sndomain;

import com.htcompany.sndomain.shared.DateRange;
import com.htcompany.sndomain.shared.DateRangeService;
import java.util.ArrayList;
import java.util.List;
import org.neo4j.driver.Value;
import org.neo4j.driver.Values;
import org.springframework.data.neo4j.core.convert.Neo4jPersistentPropertyConverter;

public class DateRangeConverter implements Neo4jPersistentPropertyConverter<DateRange> {

    @Override
    public Value write(DateRange source) {
        List<String> props = new ArrayList<>();
        props.add(source.getFromDate().toInstant().toString());
        props.add(source.getToDate().toInstant().toString());

        return Values.value(props);
    }

    @Override
    public DateRange read(Value source) {
        String fromDate = (String) source.asList().get(0);
        String toDate = (String) source.asList().get(1);

        return DateRangeService.createDateRange(fromDate, toDate);
    }
}
