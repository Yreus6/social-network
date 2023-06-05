package com.htcompany.sndomain;

import com.htcompany.sncommon.utils.DateUtils;
import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.Birthday;
import java.util.ArrayList;
import java.util.List;
import org.neo4j.driver.Value;
import org.neo4j.driver.Values;
import org.springframework.data.neo4j.core.convert.Neo4jPersistentPropertyConverter;

public class BirthdayConverter implements Neo4jPersistentPropertyConverter<Birthday> {

    @Override
    public Value write(Birthday source) {
        List<String> props = new ArrayList<>();
        props.add(source.getBirthdate().toInstant().toString());
        props.add(source.getMode().toString());

        return Values.value(props);
    }

    @Override
    public Birthday read(Value source) {
        String birthdate = (String) source.asList().get(0);
        String mode = (String) source.asList().get(1);

        return new Birthday(DateUtils.createDate(birthdate), PrivacyType.valueOf(mode));
    }
}
