#!/usr/bin/env bash
set -euo pipefail

echo "[Mini-Services] Installing dependencies..."

MINI_DIR="mini-services"

if [ ! -d "${MINI_DIR}" ]; then
  echo "[Mini-Services] No mini-services directory found. Skipping."
  exit 0
fi

for service_dir in "${MINI_DIR}"/*/; do
  if [ ! -d "$service_dir" ]; then
    continue
  fi

  service_name=$(basename "$service_dir")

  if [ -f "${service_dir}/package.json" ]; then
    echo "[Mini-Services] Installing deps for ${service_name}..."
    (cd "$service_dir" && bun install)
    echo "[Mini-Services] Installed: ${service_name}"
  else
    echo "[Mini-Services] Skipping ${service_name} (no package.json)"
  fi
done

echo "[Mini-Services] Install complete."
