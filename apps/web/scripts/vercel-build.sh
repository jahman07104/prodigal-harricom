#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
pnpm build

root="$(pwd)"
mkdir -p node_modules
rm -rf node_modules/.pnpm
ln -sfn ../../../node_modules/.pnpm node_modules/.pnpm

# Vercel Root Directory is already apps/web, but Output Directory is still
# apps/web/.next, so it looks one folder deeper. Point that nested folder
# at this app instead of copying files.
rm -rf apps/web
mkdir -p apps/web
ln -sfn "$root/.next" apps/web/.next
ln -sfn "$root/node_modules" apps/web/node_modules
ln -sfn "$root/package.json" apps/web/package.json
ln -sfn "$root/next.config.js" apps/web/next.config.js
