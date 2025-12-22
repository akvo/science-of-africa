#!/bin/sh
set -eu

echo "🚀 Starting Strapi server..."

if [ "$NODE_ENV" = "production" ]; then
    echo "✅ Starting Strapi in production mode..."
    npm run start
else
    echo "✅ Starting Strapi in development mode..."
    npm run develop
fi
