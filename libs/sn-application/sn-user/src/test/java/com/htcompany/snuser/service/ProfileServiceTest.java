package com.htcompany.snuser.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.*;
import com.htcompany.snuser.graphql.input.AddressInput;
import com.htcompany.snuser.graphql.input.BirthdayInput;
import com.htcompany.snuser.graphql.input.PhoneInput;
import com.htcompany.snuser.repository.ProfileRepository;
import com.htcompany.snuser.repository.UserRepository;
import com.htcompany.snuser.service.mapper.ProfileMapper;
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
class ProfileServiceTest {

    private static final String USER_ID = "1";
    private static final String USER_ID2 = "2";

    @Mock
    private ProfileRepository profileRepository;

    @Mock
    private UserRepository userRepository;

    private ProfileService profileService;

    @BeforeEach
    void setUp() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setFieldMatchingEnabled(true)
            .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE);
        ProfileMapper profileMapper = new ProfileMapper(mapper);
        profileService = new ProfileService(profileRepository, userRepository, profileMapper);

        User user = User.of(USER_ID, "test", "test@example.com", "test", "", "user");
        User user2 = User.of(USER_ID2, "test2", "test2@example.com", "test2", "", "user2");
        Profile mock = Profile.of(
            null, null, new Date(),
            new Address("Hanoi", "Hanoi", "Vietnam", PrivacyType.PUBLIC),
            new PhoneNumber("+84123456789", PrivacyType.PUBLIC),
            new Birthday(new Date(), PrivacyType.PUBLIC), user);
        Mockito.lenient().when(userRepository.findById(USER_ID))
            .thenReturn(Mono.just(user));
        Mockito.lenient().when(profileRepository.getProfileByUser(USER_ID))
            .thenReturn(Mono.just(mock));
        Mockito.lenient().when(userRepository.findFriendByUser(USER_ID, USER_ID2))
            .thenReturn(Mono.just(user2));
        Mockito.lenient().when(profileRepository.save(mock)).thenReturn(Mono.just(mock));
    }

    @Test
    void givenUserHasProfile_whenGetProfile_thenReturnProfile() {
        Profile profile = profileService.getProfileForUser(USER_ID, USER_ID).block();

        assertThat(profile).isNotNull();
        assertThat(profile.getUser().getId()).isEqualTo(USER_ID);
    }

    @Test
    void givenUserNotHaveProfile_whenGetProfile_thenReturnNewProfile() {
        Mockito.when(profileRepository.getProfileByUser(USER_ID)).thenReturn(Mono.empty());

        Profile profile = profileService.getProfileForUser(USER_ID, USER_ID).block();

        assertThat(profile).isNotNull();
        assertThat(profile.getUser().getId()).isEqualTo(USER_ID);
    }

    @Test
    void givenUser_whenAccessAnotherProfileWithPublicPrivacy_thenReturnProfile() {
        Profile profile = profileService.getProfileForUser(USER_ID, USER_ID2).block();

        assertThat(profile).isNotNull();
        assertThat(profile.getAddress()).isNotNull();
        assertThat(profile.getPhoneNumber()).isNotNull();
        assertThat(profile.getBirthday()).isNotNull();
    }

    @Test
    void givenUser_whenAccessAnotherProfileWithFriendPrivacy_thenReturnProfile() {
        Mockito.when(userRepository.findFriendByUser(USER_ID, USER_ID2)).thenReturn(Mono.empty());
        User user = userRepository.findById(USER_ID).block();
        Profile mock = Profile.of(
            null, null, new Date(),
            new Address("Hanoi", "Hanoi", "Vietnam", PrivacyType.FRIEND),
            new PhoneNumber("+84123456789", PrivacyType.FRIEND),
            new Birthday(new Date(), PrivacyType.FRIEND), user);
        Mockito.when(profileRepository.getProfileByUser(USER_ID)).thenReturn(Mono.just(mock));

        Profile profile = profileService.getProfileForUser(USER_ID, USER_ID2).block();

        assertThat(profile).isNotNull();
        assertThat(profile.getAddress()).isNull();
        assertThat(profile.getPhoneNumber()).isNull();
        assertThat(profile.getBirthday()).isNull();
    }

    @Test
    void givenUser_whenAccessFriendProfileWithFriendPrivacy_thenReturnProfile() {
        User user = userRepository.findById(USER_ID).block();
        Profile mock = Profile.of(
            null, null, new Date(),
            new Address("Hanoi", "Hanoi", "Vietnam", PrivacyType.FRIEND),
            new PhoneNumber("+84123456789", PrivacyType.FRIEND),
            new Birthday(new Date(), PrivacyType.FRIEND), user);
        Mockito.when(profileRepository.getProfileByUser(USER_ID)).thenReturn(Mono.just(mock));

        Profile profile = profileService.getProfileForUser(USER_ID, USER_ID2).block();

        assertThat(profile).isNotNull();
        assertThat(profile.getAddress()).isNotNull();
        assertThat(profile.getPhoneNumber()).isNotNull();
        assertThat(profile.getBirthday()).isNotNull();
    }

    @Test
    void givenUser_whenAccessAnotherProfileWithPrivatePrivacy_thenReturnProfile() {
        User user = userRepository.findById(USER_ID).block();
        Profile mock = Profile.of(
            null, null, new Date(),
            new Address("Hanoi", "Hanoi", "Vietnam", PrivacyType.PRIVATE),
            new PhoneNumber("+84123456789", PrivacyType.PRIVATE),
            new Birthday(new Date(), PrivacyType.PRIVATE), user);
        Mockito.when(profileRepository.getProfileByUser(USER_ID)).thenReturn(Mono.just(mock));

        Profile profile = profileService.getProfileForUser(USER_ID, USER_ID2).block();

        assertThat(profile).isNotNull();
        assertThat(profile.getAddress()).isNull();
        assertThat(profile.getPhoneNumber()).isNull();
        assertThat(profile.getBirthday()).isNull();
    }

    @Test
    void givenUser_whenEditAddress_thenReturnSuccess() {
        AddressInput addressInput = new AddressInput(
            "Hanoi", "Hanoi", "Vietnam", "PUBLIC"
        );
        Profile profile = profileService.editAddressForUser(USER_ID, addressInput).block();

        assertThat(profile).isNotNull();
        assertThat(profile.getAddress().getCity()).isEqualTo("Hanoi");
    }

    @Test
    void givenUser_whenEditBirthday_thenReturnSuccess() {
        BirthdayInput birthdayInput = new BirthdayInput("2011-12-03T10:15:30Z", "PUBLIC");
        Profile profile = profileService.editBirthdayForUser(USER_ID, birthdayInput).block();

        assertThat(profile).isNotNull();
        assertThat(profile.getBirthday().getBirthdate()).hasYear(2011);
    }

    @Test
    void givenUser_whenEditPhone_thenReturnSuccess() {
        PhoneInput phoneInput = new PhoneInput("+84123456789", "PUBLIC");
        Profile profile = profileService.editPhoneForUser(USER_ID, phoneInput).block();

        assertThat(profile).isNotNull();
        assertThat(profile.getPhoneNumber().getPhone()).isEqualTo("+84123456789");
    }

    @Test
    void givenUser_whenEditGender_thenReturnSuccess() {
        Profile profile = profileService.editGenderForUser(USER_ID, "male").block();

        assertThat(profile).isNotNull();
        assertThat(profile.getGender()).isEqualTo("male");
    }

    @Test
    void givenUser_whenEditBio_thenReturnSuccess() {
        Profile profile = profileService.editBioForUser(USER_ID, "About me").block();

        assertThat(profile).isNotNull();
        assertThat(profile.getBiography()).isEqualTo("About me");
    }

    @Test
    void givenUser_whenEditInterests_thenReturnSuccess() {
        List<String> interests = List.of("a", "b", "c");
        Profile profile = profileService.editInterestsForUser(USER_ID, interests).block();

        assertThat(profile).isNotNull();
        assertThat(profile.getInterests()).hasSize(3);
    }
}
