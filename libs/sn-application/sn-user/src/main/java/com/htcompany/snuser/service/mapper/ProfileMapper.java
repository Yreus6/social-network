package com.htcompany.snuser.service.mapper;

import com.htcompany.sncommon.utils.DateUtils;
import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.Address;
import com.htcompany.sndomain.user.Birthday;
import com.htcompany.sndomain.user.PhoneNumber;
import com.htcompany.snuser.graphql.input.AddressInput;
import com.htcompany.snuser.graphql.input.BirthdayInput;
import com.htcompany.snuser.graphql.input.PhoneInput;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ProfileMapper {

    private final ModelMapper mapper;

    public ProfileMapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    public Address addressInputToAddress(AddressInput addressInput) {
        return mapper.map(addressInput, Address.class);
    }

    public Birthday birthdayInputToBirthday(BirthdayInput birthdayInput) {
        return new Birthday(
            DateUtils.createDate(birthdayInput.getBirthdate()),
            PrivacyType.valueOf(birthdayInput.getMode())
        );
    }

    public PhoneNumber phoneInputToPhone(PhoneInput phoneInput) {
        return new PhoneNumber(
            phoneInput.getPhone(), PrivacyType.valueOf(phoneInput.getMode())
        );
    }
}
