package com.htcompany.snuser.service.mapper;

import com.htcompany.sndomain.shared.DateRange;
import com.htcompany.sndomain.shared.DateRangeService;
import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.Education;
import com.htcompany.snuser.graphql.input.EducationInput;
import java.util.HashSet;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class EducationMapper {

    private final ModelMapper mapper;

    public EducationMapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    public Education educationInputToEducation(EducationInput educationInput) {
        Education education = mapper.map(educationInput, Education.class);
        DateRange dateRange = DateRangeService.createDateRange(
            educationInput.getFromDate(), educationInput.getToDate()
        );

        return Education.of(
            education.getSchool(),
            education.getIsGraduate(),
            education.getDescription(),
            education.getDegree(),
            new HashSet<>(educationInput.getConcentrations()),
            dateRange,
            PrivacyType.valueOf(educationInput.getMode())
        );
    }
}
