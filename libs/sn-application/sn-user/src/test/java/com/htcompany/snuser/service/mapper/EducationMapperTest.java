package com.htcompany.snuser.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import com.htcompany.sndomain.user.Education;
import com.htcompany.snuser.graphql.input.EducationInput;
import java.util.Collections;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;

class EducationMapperTest {

    private EducationMapper educationMapper;

    @BeforeEach
    void setUp() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
            .setFieldMatchingEnabled(true)
            .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE);
        educationMapper = new EducationMapper(modelMapper);
    }

    @Test
    void givenEducationInput_whenMapToEducation_thenReturnEducation() {
        EducationInput educationInput = new EducationInput(
            "test", true, "",
            Collections.emptyList(), "", "2011-12-03T10:15:30Z", "2012-12-03T10:15:30Z", "PUBLIC"
        );
        Education education = educationMapper.educationInputToEducation(educationInput);

        assertThat(education).isNotNull();
        assertThat(education.getSchool()).isEqualTo("test");
    }

}
