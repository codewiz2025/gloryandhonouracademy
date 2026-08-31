#!/usr/bin/env bash
set -euo pipefail

if [ -z "${DATABASE_URL:-}" ]; then
  echo "ERROR: DATABASE_URL is not set. Provide the Supabase DB connection string as DATABASE_URL=" >&2
  exit 2
fi

OUT_DIR="./tmp/supabase-export-$(date +%F_%H%M%S)"
mkdir -p "$OUT_DIR"

echo "Exporting schema-only to $OUT_DIR/schema.sql..."
pg_dump --schema-only --no-owner --no-acl --dbname="$DATABASE_URL" > "$OUT_DIR/schema.sql"

echo "Exporting full custom-format dump to $OUT_DIR/dump.custom"
pg_dump --format=custom --no-owner --no-acl --dbname="$DATABASE_URL" -f "$OUT_DIR/dump.custom"

echo "Listing extensions..."
psql "$DATABASE_URL" -Atc "SELECT extname FROM pg_extension;" > "$OUT_DIR/extensions.txt"

echo "Export complete. Artifacts in $OUT_DIR"
# Note: Do NOT commit dumps to the repo. These are local artifacts. Use GitHub Actions artifacts
