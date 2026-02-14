#!/usr/bin/env bash
set -euo pipefail

echo "=== Production Start ==="

PIDS=()

cleanup() {
  echo ""
  echo "[Shutdown] Stopping all services..."
  for pid in "${PIDS[@]}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill -TERM "$pid" 2>/dev/null || true
    fi
  done
  wait
  echo "[Shutdown] All services stopped."
  exit 0
}

trap cleanup SIGTERM SIGINT

# Start Next.js
echo "[1/3] Starting Next.js on port 3000..."
if [ -f ".next/standalone/server.js" ]; then
  bun .next/standalone/server.js &
else
  bun run start &
fi
PIDS+=($!)
echo "  PID: ${PIDS[-1]}"

# Start mini-services
echo "[2/3] Starting mini-services..."
bash "$(dirname "$0")/mini-services-start.sh" &
PIDS+=($!)

# Start Caddy (foreground)
echo "[3/3] Starting Caddy on port 81..."
if command -v caddy &>/dev/null; then
  caddy run --config Caddyfile
else
  echo "[Warning] Caddy not found. Skipping reverse proxy."
  echo "[Info] Next.js is running on http://localhost:3000"
  # Wait for background processes
  wait
fi
