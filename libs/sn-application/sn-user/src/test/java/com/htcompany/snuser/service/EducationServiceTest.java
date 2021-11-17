package com.htcompany.snuser.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.htcompany.sncommon.exception.EntityNotFoundException;
import com.htcompany.sndomain.shared.DateRange;
import com.htcompany.sndomain.shared.DateRangeService;
import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.Education;
import com.htcompany.sndomain.user.Profile;
import com.htcompany.sndomain.user.User;
import com.htcompany.snuser.graphql.input.EducationInput;
import com.htcompany.snuser.repository.EducationRepository;
import com.htcompany.snuser.repository.ProfileRepository;
import com.htcompany.snuser.repository.UserRepository;
import com.htcompany.snuser.service.mapper.EducationMapper;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import reactor.core.publisher.Mono;

@ExtendWith(MockitoExtension.class)
class EducationServiceTest {

    private static final String USER_ID = "1";

    private static final String FROM_DATE = "2011-12-03T10:15:30Z";
    private static final String TO_DATE = "2012-12-03T10:15:30Z";

    private static final String EDUCATION_ID = "1";

    @Mock
    private ProfileRepository profileRepository;

    @Mock
    private EducationRepository educationRepository;

    @Mock
    private UserRepository userRepository;

    private EducationService educationService;

    @BeforeEach
    void setUp() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setFieldMatchingEnabled(true)
            .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE);
        EducationMapper educationMapper = new EducationMapper(mapper);
        educationService = new EducationService(
            educationRepository, profileRepository, educationMapper
        );

        User user = User.of(USER_ID, "test", "test@example.com", "test", "", "user");
        Profile profile = Profile.of(
            null, null, new Date(), null, null, null, user);
        Mockito.lenient().when(userRepository.findById(USER_ID))
            .thenReturn(Mono.just(user));
        Mockito.lenient().when(profileRepository.getProfileByUser(USER_ID))
            .thenReturn(Mono.just(profile));
        Mockito.lenient().when(profileRepository.save(profile)).thenReturn(Mono.just(profile));

        DateRange dateRange = DateRangeService.createDateRange(FROM_DATE, TO_DATE);
        Education education = Education.of(
            "test", true, "", "", Collections.emptySet(),
            dateRange, PrivacyType.PUBLIC
        );
        Mockito.lenient().when(educationRepository.findEducationByUser(USER_ID, EDUCATION_ID))
            .thenReturn(Mono.just(education));
        Mockito.lenient().when(educationRepository.save(education)).thenReturn(Mono.just(education));
        Mockito.lenient().when(educationRepository.delete(education)).thenReturn(Mono.empty());
    }

    @Test
    void givenUser_whenAddEducation_thenReturnEducation() {
        Education education = educationService.addEducationForUser(
            USER_ID,
            new EducationInput(
                "test", true, "", Collections.emptyList(),
                "", FROM_DATE, TO_DATE, "PUBLIC"
            )
        ).block();

        assertThat(education).isNotNull();
        assertThat(education.getSchool()).isEqualTo("test");
    }

    @Test
    void givenUser_whenEditExistEducation_thenReturnUpdatedEducation() {
        EducationInput educationInput = new EducationInput(
            "test1", false, "Description", List.of("a", "b", "c"),
            "Master", "2015-12-03T10:15:30Z", "2016-12-03T10:15:30Z", "FRIEND"
        );
        Education updated = educationService.editEducationForUser(USER_ID, EDUCATION_ID, educationInput).block();

        assertThat(updated).isNotNull();
        assertThat(updated.getSchool()).isEqualTo("test1");
        assertThat(updated.getConcentrations()).hasSize(3);
    }

    @Test
    void givenUser_whenEditNotExistEducation_thenReturnError() {
        Mockito.when(educationRepository.findEducationByUser(USER_ID, "2"))
            .thenReturn(Mono.empty());

        EducationInput educationInput = new EducationInput(
            "test1", false, "Description", List.of("a", "b", "c"),
            "Master", "2015-12-03T10:15:30Z", "2016-12-03T10:15:30Z", "FRIEND"
        );

        assertThatThrownBy(() -> educationService.editEducationForUser(USER_ID, "2", educationInput).block())
            .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void givenUser_whenRemoveEducation_thenReturnSuccess() {
        Education education = educationService.removeEducationForUser(USER_ID, EDUCATION_ID).block();

        assertThat(education).isNotNull();
    }
}
