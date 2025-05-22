#!/bin/sh
set -e

# Wait for Postgres to be available (if using Postgres)
if [ -n "$DATABASE_URL" ] && [[ "$DATABASE_URL" == postgresql* ]]; then
  echo "Waiting for PostgreSQL to start..."
  
  # Extract host and port from DATABASE_URL
  DB_HOST=$(echo $DATABASE_URL | sed -e 's/^.*@//' -e 's/:.*//' -e 's/\/.*//')
  DB_PORT=$(echo $DATABASE_URL | sed -e 's/^.*://' -e 's/\/.*//')
  
  until nc -z $DB_HOST $DB_PORT; do
    sleep 1
  done
  echo "PostgreSQL started"
  
  # Generate Prisma client again to ensure it's up to date
  echo "Generating Prisma client..."
  npx prisma generate
  
  # Run Prisma database push
  echo "Running Prisma database push..."
  npx prisma db push
  
  # Seed the database if SEED_DATABASE is set to true
  if [ "$SEED_DATABASE" = "true" ]; then
    echo "Seeding the database with Prisma..."
    npx prisma db seed
  fi
# Fallback for MongoDB (legacy support)
elif [ -n "$MONGODB_URI" ]; then
  echo "Waiting for MongoDB to start..."
  
  # Extract host and port from MONGODB_URI
  MONGO_HOST=$(echo $MONGODB_URI | sed -e 's/^.*@//' -e 's/:.*//' -e 's/\/.*//')
  MONGO_PORT=27017
  
  if [[ "$MONGODB_URI" == *":"*"/"* ]]; then
    MONGO_PORT=$(echo $MONGODB_URI | sed -e 's/^.*://' -e 's/\/.*//')
  fi
  
  until nc -z $MONGO_HOST $MONGO_PORT; do
    sleep 1
  done
  echo "MongoDB started"
  
  # Seed the database if SEED_DATABASE is set to true
  if [ "$SEED_DATABASE" = "true" ]; then
    echo "Seeding the database with MongoDB..."
    node /app/scripts/seed.js
  fi
fi

# Start the Next.js application
echo "Starting the application..."
exec "$@"