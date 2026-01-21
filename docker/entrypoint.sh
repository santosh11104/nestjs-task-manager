#!/bin/bash
set -e

echo "Waiting for PostgreSQL to be ready..."

RETRIES=10
until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USERNAME" -d "$DB_NAME" -c '\q' || [ $RETRIES -eq 0 ]; do
  echo "Postgres unavailable, retrying... ($RETRIES left)"
  RETRIES=$((RETRIES - 1))
  sleep 3
done

if [ $RETRIES -eq 0 ]; then
  echo "PostgreSQL did not become ready in time. Exiting."
  exit 1
fi

echo "Running database migrations..."
npm run migration:run

echo "Starting NestJS..."
npm run start:prod
