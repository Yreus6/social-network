package com.htcompany.sncommon.config;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final CorsOrigin cors = new CorsOrigin();

    public CorsOrigin getCors() {
        return cors;
    }

    public static class CorsOrigin {

        private List<String> allowedOrigins;
        private List<String> allowedMethods;

        public List<String> getAllowedOrigins() {
            return allowedOrigins;
        }

        public void setAllowedOrigins(List<String> allowedOrigins) {
            this.allowedOrigins = allowedOrigins;
        }

        public List<String> getAllowedMethods() {
            return allowedMethods;
        }

        public void setAllowedMethods(List<String> allowedMethods) {
            this.allowedMethods = allowedMethods;
        }
    }
}
