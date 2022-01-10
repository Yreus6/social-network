package com.htcompany.snuser.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import com.htcompany.sndomain.user.Job;
import com.htcompany.snuser.graphql.input.JobInput;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;

class JobMapperTest {

    private JobMapper jobMapper;

    @BeforeEach
    void setUp() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
            .setFieldMatchingEnabled(true)
            .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE);
        jobMapper = new JobMapper(modelMapper);
    }

    @Test
    void givenJobInput_whenMapToJob_thenReturnJob() {
        JobInput jobInput = new JobInput(
            "test", "", "", "",
            false, "2011-12-03T10:15:30Z", "2012-12-03T10:15:30Z", "PUBLIC"
        );
        Job job = jobMapper.jobInputToJob(jobInput);

        assertThat(job).isNotNull();
        assertThat(job.getCompany()).isEqualTo("test");
    }
}
