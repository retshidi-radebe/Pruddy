#!/usr/bin/env bash
set -euo pipefail

echo "=== Full-Stack Build ==="
BUILD_ID=$(date +%s)
BUILD_DIR="/tmp/build_fullstack_${BUILD_ID}"

echo "[1/6] Installing dependencies..."
bun install --frozen-lockfile || bun install

echo "[2/6] Generating Prisma client..."
bunx prisma generate

echo "[3/6] Building Next.js..."
bun run build

echo "[4/6] Building mini-services..."
bash "$(dirname "$0")/mini-services-build.sh"

echo "[5/6] Collecting build artifacts..."
mkdir -p "${BUILD_DIR}"

# Copy Next.js standalone output
if [ -d ".next/standalone" ]; then
  cp -r .next/standalone/* "${BUILD_DIR}/"
  cp -r .next/static "${BUILD_DIR}/.next/static"
  cp -r public "${BUILD_DIR}/public"
fi

# Copy mini-services dist
if [ -d "mini-services-dist" ]; then
  cp -r mini-services-dist "${BUILD_DIR}/mini-services-dist"
fi

# Copy Prisma files
mkdir -p "${BUILD_DIR}/prisma"
cp prisma/schema.prisma "${BUILD_DIR}/prisma/"
cp .env "${BUILD_DIR}/.env" 2>/dev/null || true

# Copy Caddy config
cp Caddyfile "${BUILD_DIR}/Caddyfile"

# Copy scripts
cp -r .zscripts "${BUILD_DIR}/.zscripts"

# Copy db directory
mkdir -p "${BUILD_DIR}/db"

echo "[6/6] Running Prisma migrations..."
bunx prisma db push --skip-generate 2>/dev/null || true

echo ""
echo "=== Build complete ==="
echo "Build directory: ${BUILD_DIR}"
echo ""

# Package as tar.gz
ARCHIVE="/tmp/build_fullstack_${BUILD_ID}.tar.gz"
cd /tmp && tar -czf "${ARCHIVE}" "build_fullstack_${BUILD_ID}"
echo "Archive: ${ARCHIVE}"
echo "Size: $(du -sh "${ARCHIVE}" | cut -f1)"
