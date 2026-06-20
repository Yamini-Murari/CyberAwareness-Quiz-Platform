# =========================================================================
# Stage 1: Build the Spring Boot application using Maven
# =========================================================================
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder

WORKDIR /build

# Copy the pom.xml to download dependencies first (improves caching)
COPY pom.xml .

# Download dependencies (go-offline) to cache them
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Build the application (skipping tests for faster deployment builds)
RUN mvn clean package -DskipTests

# =========================================================================
# Stage 2: Create the runtime container with JRE
# =========================================================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Add a non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy the built JAR from the builder stage
# Uses wildcard to avoid breaking when POM version changes
COPY --from=builder /build/target/*.jar app.jar

# Render assigns a dynamic port via the PORT environment variable
ENV PORT=8080
EXPOSE 8080

# Run the application with the Render-assigned PORT
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
