FROM openjdk:11-jdk

RUN chmod +x gradlew
RUN ./gradlew clean build

ARG JAR_FILE=./build/libs/dog-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]