#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."
corepack enable
corepack prepare pnpm@9.12.3 --activate
pnpm install --filter @prodigal/web... --filter '!harricom-templates' --no-frozen-lockfile
mkdir -p apps/web/node_modules
rm -rf apps/web/node_modules/.pnpm
ln -sfn ../../../node_modules/.pnpm apps/web/node_modules/.pnpm
