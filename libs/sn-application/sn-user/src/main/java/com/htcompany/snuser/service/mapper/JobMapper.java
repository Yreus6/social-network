package com.htcompany.snuser.service.mapper;

import com.htcompany.sndomain.shared.DateRange;
import com.htcompany.sndomain.shared.DateRangeService;
import com.htcompany.sndomain.shared.PrivacyType;
import com.htcompany.sndomain.user.Job;
import com.htcompany.snuser.graphql.input.JobInput;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class JobMapper {

    private final ModelMapper mapper;

    public JobMapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    public Job jobInputToJob(JobInput jobInput) {
        Job job = mapper.map(jobInput, Job.class);
        DateRange dateRange = DateRangeService.createDateRange(
            jobInput.getFromDate(), jobInput.getToDate()
        );

        return Job.of(
            job.getCompany(),
            job.getPosition(),
            job.getCity(),
            job.getDescription(),
            job.getIsCurrentWork(),
            dateRange,
            PrivacyType.valueOf(jobInput.getMode())
        );
    }
}
