package com.htcompany.snuser.service;

import com.htcompany.sncommon.exception.EntityNotFoundException;
import com.htcompany.sndomain.user.Education;
import com.htcompany.snuser.graphql.input.EducationInput;
import com.htcompany.snuser.repository.EducationRepository;
import com.htcompany.snuser.repository.ProfileRepository;
import com.htcompany.snuser.service.mapper.EducationMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    private final ProfileRepository profileRepository;

    private final EducationMapper mapper;

    public EducationService(
        EducationRepository educationRepository,
        ProfileRepository profileRepository,
        EducationMapper mapper) {
        this.educationRepository = educationRepository;
        this.profileRepository = profileRepository;
        this.mapper = mapper;
    }

    public Flux<Education> getEducationsForUser(String userId) {
        return educationRepository.findEducationsForUser(userId);
    }

    @Transactional
    public Mono<Education> addEducationForUser(String userId, EducationInput educationInput) {
        return profileRepository.getProfileByUser(userId)
            .flatMap(profile -> {
                Education education = mapper.educationInputToEducation(educationInput);

                return educationRepository.save(education)
                    .flatMap(savedEdu -> {
                        profile.addEducation(savedEdu);

                        return profileRepository.save(profile)
                            .thenReturn(savedEdu);
                    });
            });
    }

    public Mono<Education> editEducationForUser(String userId, String educationId, EducationInput educationInput) {
        return getEducationByUser(userId, educationId)
            .flatMap(education -> {
                Education eduToUpdate = mapper.educationInputToEducation(educationInput);
                education.updateWith(eduToUpdate);

                return educationRepository.save(education);
            });
    }

    public Mono<Education> removeEducationForUser(String userId, String educationId) {
        return getEducationByUser(userId, educationId)
            .flatMap(education -> educationRepository.delete(education)
                .thenReturn(education)
            );
    }

    private Mono<Education> getEducationByUser(String userId, String educationId) {
        return educationRepository.findEducationByUser(userId, educationId)
            .switchIfEmpty(Mono.error(new EntityNotFoundException("Could not find education")));
    }
}
