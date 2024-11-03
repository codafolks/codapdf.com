# Use an official PostgreSQL image as a base
FROM postgres:latest AS postgres

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

# Define volumes to persist data
VOLUME /var/lib/postgresql/data

# Use an official Dragonfly image as a base
FROM dragonflydb/dragonfly:latest AS dragonfly

# Set environment variables for Dragonfly
ENV DRAGONFLY_DB_USER=${DRAGONFLY_DB_USER}
ENV DRAGONFLY_DB_PASSWORD=${DRAGONFLY_DB_PASSWORD}
ENV DRAGONFLY_DB_NAME=${DRAGONFLY_DB_NAME}

# Expose the default ports for PostgreSQL and Dragonfly
EXPOSE 5432 8080

# Start both services
CMD ["sh", "-c", "postgres & dragonfly"]