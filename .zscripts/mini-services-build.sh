#!/usr/bin/env bash
set -euo pipefail

echo "[Mini-Services] Building..."

MINI_DIR="mini-services"
DIST_DIR="mini-services-dist"

mkdir -p "${DIST_DIR}"

if [ ! -d "${MINI_DIR}" ]; then
  echo "[Mini-Services] No mini-services directory found. Skipping."
  exit 0
fi

for service_dir in "${MINI_DIR}"/*/; do
  if [ ! -d "$service_dir" ]; then
    continue
  fi

  service_name=$(basename "$service_dir")

  # Skip if no entry file
  entry=""
  for ext in ts js; do
    if [ -f "${service_dir}/index.${ext}" ]; then
      entry="${service_dir}/index.${ext}"
      break
    fi
  done

  if [ -z "$entry" ]; then
    echo "[Mini-Services] Skipping ${service_name} (no index.ts or index.js found)"
    continue
  fi

  echo "[Mini-Services] Building ${service_name}..."
  bun build "$entry" --outfile "${DIST_DIR}/mini-service-${service_name}.js" --target bun
  echo "[Mini-Services] Built: ${DIST_DIR}/mini-service-${service_name}.js"
done

echo "[Mini-Services] Build complete."
