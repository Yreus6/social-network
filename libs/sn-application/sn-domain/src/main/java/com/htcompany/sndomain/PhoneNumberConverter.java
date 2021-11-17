package com.htcompany.sndomain;

import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.PhoneNumber;
import java.util.ArrayList;
import java.util.List;
import org.neo4j.driver.Value;
import org.neo4j.driver.Values;
import org.springframework.data.neo4j.core.convert.Neo4jPersistentPropertyConverter;

public class PhoneNumberConverter implements Neo4jPersistentPropertyConverter<PhoneNumber> {

    @Override
    public Value write(PhoneNumber source) {
        List<String> props = new ArrayList<>();
        props.add(source.getPhone());
        props.add(source.getMode().toString());

        return Values.value(props);
    }

    @Override
    public PhoneNumber read(Value source) {
        String phone = (String) source.asList().get(0);
        String mode = (String) source.asList().get(1);

        return new PhoneNumber(phone, PrivacyType.valueOf(mode));
    }
}
