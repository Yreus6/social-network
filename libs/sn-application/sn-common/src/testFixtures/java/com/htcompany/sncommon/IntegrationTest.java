package com.htcompany.sncommon;

import com.htcompany.sncommon.config.MockJwtUserConfiguration;
import com.htcompany.sncommon.config.TestSecurityConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest
@ExtendWith(AbstractNeo4jIT.class)
@Import({
    TestSecurityConfiguration.class,
    MockJwtUserConfiguration.class
})
public @interface IntegrationTest {
}
