FROM openjdk:11.0-jre-slim

ARG JAR_FILE=./apps/sn-application/build/libs/sn-application-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} /usr/share/social-network/sn-application-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/usr/share/social-network/sn-application-0.0.1-SNAPSHOT.jar"]
