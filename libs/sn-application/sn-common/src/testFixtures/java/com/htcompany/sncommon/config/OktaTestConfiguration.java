package com.htcompany.sncommon.config;

import com.okta.sdk.client.Client;
import org.mockito.Mockito;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

@TestConfiguration
public class OktaTestConfiguration {

    @Bean
    @Primary
    public Client oktaClient() {
        return Mockito.mock(Client.class);
    }
}
