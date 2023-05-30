FROM openjdk:11.0-jre-slim

ARG JAR_FILE
COPY ${JAR_FILE} /usr/share/social-network/sn-application.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/usr/share/social-network/sn-application.jar", "--spring.config.location=/usr/share/social-network/config/application.yml"]
