package com.htcompany.snapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.htcompany")
public class SnApplication {

    public static void main(String[] args) {
        SpringApplication.run(SnApplication.class, args);
    }
}
