FROM openjdk:11.0-jre-slim

COPY ${JAR_FILE} /usr/share/social-network/sn-application.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/usr/share/social-network/sn-application.jar"]
