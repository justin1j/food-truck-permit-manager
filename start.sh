#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h db -p 5432 -U postgres; do
  echo "PostgreSQL not ready yet"
  sleep 1
done
echo "PostgreSQL is ready"

echo "Applying database migrations..."
npx prisma migrate dev --name init || { echo "Migrations failed"; exit 1; }
echo "Prisma Migration is finished"

echo "Importing Data"
npm run importData
echo "Data is imported"

echo "Starting the application..."
npm start

