package com.htcompany.snapplication;

import com.htcompany.sncommon.config.ApplicationProperties;
import com.htcompany.snuser.config.UserContextConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Import;

@SpringBootApplication(scanBasePackages = "com.htcompany")
@EnableConfigurationProperties({ApplicationProperties.class})
@Import({
    UserContextConfiguration.class
})
public class SnApplication {

    public static void main(String[] args) {
        SpringApplication.run(SnApplication.class, args);
    }
}
