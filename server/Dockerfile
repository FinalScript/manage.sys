FROM maven:3.8.2-openjdk-17-slim as base

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src

RUN mvn -f ./pom.xml clean package -DskipTests

FROM openjdk:17

EXPOSE 8080

COPY --from=base /app/target/store-management-api-*.jar /app.jar

CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]