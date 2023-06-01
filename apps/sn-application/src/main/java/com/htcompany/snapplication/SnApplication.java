package com.htcompany.snapplication;

import com.htcompany.sncommon.config.ApplicationProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication(scanBasePackages = "com.htcompany")
@EnableConfigurationProperties({ ApplicationProperties.class })
public class SnApplication {

    public static void main(String[] args) {
        SpringApplication.run(SnApplication.class, args);
    }
}
