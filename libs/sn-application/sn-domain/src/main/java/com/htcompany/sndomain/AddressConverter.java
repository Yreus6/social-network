package com.htcompany.sndomain;

import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.Address;
import java.util.ArrayList;
import java.util.List;
import org.neo4j.driver.Value;
import org.neo4j.driver.Values;
import org.springframework.data.neo4j.core.convert.Neo4jPersistentPropertyConverter;

public class AddressConverter implements Neo4jPersistentPropertyConverter<Address> {

    @Override
    public Value write(Address source) {
        List<String> props = new ArrayList<>();
        props.add(source.getCity());
        props.add(source.getRegion());
        props.add(source.getCountry());
        props.add(source.getMode().toString());

        return Values.value(props);
    }

    @Override
    public Address read(Value source) {
        String city = (String) source.asList().get(0);
        String region = (String) source.asList().get(1);
        String country = (String) source.asList().get(2);
        String mode = (String) source.asList().get(3);

        return new Address(city, region, country, PrivacyType.valueOf(mode));
    }
}
