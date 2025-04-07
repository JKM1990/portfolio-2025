#!/bin/sh
set -e

# Wait for MongoDB to be available
echo "Waiting for MongoDB to start..."
until nc -z mongodb 27017; do
  sleep 1
done
echo "MongoDB started"

# Seed the database if SEED_DATABASE is set to true
if [ "$SEED_DATABASE" = "true" ]; then
  echo "Seeding the database..."
  node /app/scripts/seed.js
fi

# Start the Next.js application
echo "Starting the application..."
exec "$@"
