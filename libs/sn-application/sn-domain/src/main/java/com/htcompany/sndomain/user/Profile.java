package com.htcompany.sndomain.user;

import com.htcompany.sndomain.AddressConverter;
import com.htcompany.sndomain.BirthdayConverter;
import com.htcompany.sndomain.PhoneNumberConverter;
import java.util.*;
import org.springframework.data.neo4j.core.convert.ConvertWith;
import org.springframework.data.neo4j.core.schema.*;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

@Node
public class Profile {

    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;

    private String gender;

    private String biography;

    @Property(name = "joined_at")
    private Date joinedAt;

    private Set<String> interests;

    @ConvertWith(converter = AddressConverter.class)
    private Address address;

    @ConvertWith(converter = PhoneNumberConverter.class)
    @Property(name = "phone_number")
    private PhoneNumber phoneNumber;

    @ConvertWith(converter = BirthdayConverter.class)
    private Birthday birthday;

    @Relationship(type = "STUDIED")
    private Set<Education> educations;

    @Relationship(type = "WORKED")
    private Set<Job> jobs;

    @Relationship(type = "HAS_PROFILE", direction = Relationship.Direction.INCOMING)
    private User user;

    private Profile() {
    }

    private Profile(
        String id, String gender, String biography, Date joinedAt, Address address,
        PhoneNumber phoneNumber, Birthday birthday, User user) {
        this.id = id;
        this.gender = gender;
        this.biography = biography;
        this.joinedAt = joinedAt;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.user = user;
        this.interests = new HashSet<>();
        this.educations = new HashSet<>();
        this.jobs = new HashSet<>();
    }

    public static Profile of(
        String gender, String biography, Date joinedAt, Address address,
        PhoneNumber phoneNumber, Birthday birthday, User user) {
        return new Profile(
            null, gender, biography, joinedAt,
            address, phoneNumber, birthday, user
        );
    }

    public void addInterests(Set<String> newInterests) {
        interests.addAll(newInterests);
    }

    public void addEducation(Education newEdu) {
        educations.add(newEdu);
    }

    public void addJob(Job newJob) {
        jobs.add(newJob);
    }

    public void changeAddress(Address anAddress) {
        this.setAddress(anAddress);
    }

    public void changeBirthday(Birthday aBirthday) {
        this.setBirthday(aBirthday);
    }

    public void changePhone(PhoneNumber aPhone) {
        this.setPhoneNumber(aPhone);
    }

    public void changeGender(String aGender) {
        this.setGender(aGender);
    }

    public void changeBio(String aBio) {
        this.setBiography(aBio);
    }

    public String getId() {
        return id;
    }

    public String getGender() {
        return gender;
    }

    private void setGender(String gender) {
        this.gender = gender;
    }

    public String getBiography() {
        return biography;
    }

    private void setBiography(String biography) {
        this.biography = biography;
    }

    public Date getJoinedAt() {
        return joinedAt;
    }

    public Set<String> getInterests() {
        return Collections.unmodifiableSet(interests);
    }

    public Address getAddress() {
        return address;
    }

    private void setAddress(Address address) {
        this.address = address;
    }

    public PhoneNumber getPhoneNumber() {
        return phoneNumber;
    }

    private void setPhoneNumber(PhoneNumber phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Birthday getBirthday() {
        return birthday;
    }

    private void setBirthday(Birthday birthday) {
        this.birthday = birthday;
    }

    public Set<Education> getEducations() {
        return Collections.unmodifiableSet(educations);
    }

    public Set<Job> getJobs() {
        return Collections.unmodifiableSet(jobs);
    }

    public User getUser() {
        return user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Profile profile = (Profile) o;
        return Objects.equals(id, profile.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Profile{" +
            "id='" + id + '\'' +
            ", gender='" + gender + '\'' +
            ", biography='" + biography + '\'' +
            ", joinedAt=" + joinedAt +
            ", interests=" + interests +
            ", address=" + address +
            ", phoneNumber=" + phoneNumber +
            ", birthday=" + birthday +
            ", educations=" + educations +
            ", jobs=" + jobs +
            ", user=" + user +
            '}';
    }
}
