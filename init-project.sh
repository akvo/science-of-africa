#!/bin/bash
set -e

echo "🚀 Initializing project..."

# Initialize backend (Strapi)
if [ ! -f "backend/package.json" ]; then
    echo "📦 Initializing Strapi backend..."
    
    # Create Strapi app in temporary directory
    npx create-strapi-app@latest temp-strapi --quickstart --no-run --skip-cloud --no-example
    
    # Move Strapi files to backend directory
    mv temp-strapi/* backend/ 2>/dev/null || true
    mv temp-strapi/.* backend/ 2>/dev/null || true
    rm -rf temp-strapi
    
    cd backend

    # Install additional packages
    npm install pg sharp --legacy-peer-deps

    # Install testing dependencies
    npm install --save-dev jest supertest @types/jest @types/supertest --legacy-peer-deps

    echo "✅ Backend initialized"
    cd ..
else
    echo "ℹ️  Backend already initialized"
fi

# Initialize frontend (Next.js)
if [ ! -f "frontend/package.json" ]; then
    echo "📦 Initializing Next.js frontend..."
    
    # Create Next.js app in temporary directory (JavaScript + Pages Router)
    npx create-next-app@latest temp-nextjs --js --tailwind --eslint --no-app --import-alias "@/*"
    
    # Move Next.js files to frontend directory
    mv temp-nextjs/* frontend/ 2>/dev/null || true
    mv temp-nextjs/.* frontend/ 2>/dev/null || true
    rm -rf temp-nextjs
    
    cd frontend

    # Install additional packages
    npm install axios

    # Install testing dependencies (no TypeScript types needed)
    npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

    echo "✅ Frontend initialized"
    cd ..
else
    echo "ℹ️  Frontend already initialized"
fi

echo "🎉 Project initialization completed!"

# Clean up node_modules - Docker will reinstall with correct Linux binaries
echo "🧹 Cleaning node_modules (Docker will reinstall)..."
rm -rf backend/node_modules frontend/node_modules
echo "✅ Ready for Docker!"
