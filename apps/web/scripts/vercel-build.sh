#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
pnpm build
mkdir -p apps/web/.next node_modules
cp -R .next/. apps/web/.next/
rm -rf node_modules/.pnpm
ln -sfn ../../../node_modules/.pnpm node_modules/.pnpm
