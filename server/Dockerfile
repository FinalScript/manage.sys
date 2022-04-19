FROM maven:3.8.2-openjdk-17-slim as base

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src

FROM base as test
CMD ["mvn", "test"]

FROM base as development
CMD ["mvn", "spring-boot:run"]

FROM base as build

RUN mvn -f ./pom.xml clean package -DskipTests

FROM openjdk:17-alpine as production

EXPOSE 80

COPY --from=build /app/target/store-management-api-*.jar /app.jar

CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar", "--server.port=80"]