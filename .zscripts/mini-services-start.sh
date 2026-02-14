#!/usr/bin/env bash
set -euo pipefail

echo "[Mini-Services] Starting..."

DIST_DIR="mini-services-dist"
PIDS=()

cleanup() {
  echo "[Mini-Services] Stopping all services..."
  for pid in "${PIDS[@]}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill -TERM "$pid" 2>/dev/null || true
    fi
  done
  wait
  echo "[Mini-Services] All services stopped."
}

trap cleanup SIGTERM SIGINT EXIT

if [ ! -d "${DIST_DIR}" ]; then
  echo "[Mini-Services] No dist directory found. Skipping."
  exit 0
fi

for service_file in "${DIST_DIR}"/mini-service-*.js; do
  if [ ! -f "$service_file" ]; then
    continue
  fi

  service_name=$(basename "$service_file" .js)
  echo "[Mini-Services] Starting ${service_name}..."
  bun "$service_file" &
  PIDS+=($!)
  echo "[Mini-Services] Started ${service_name} (PID: ${PIDS[-1]})"
done

if [ ${#PIDS[@]} -eq 0 ]; then
  echo "[Mini-Services] No services to start."
  exit 0
fi

echo "[Mini-Services] All services started."
wait
