#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

pushd backend >/dev/null
python -m ruff check .
python -m black --check .
python -m mypy app
python -m pytest
popd >/dev/null

pushd frontend >/dev/null
export NODE_OPTIONS="--use-system-ca"
npm run typecheck
npm run lint
npm run test
npm run e2e
npm run build
popd >/dev/null
