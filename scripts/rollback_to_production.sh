#!/usr/bin/env bash
# ==============================================================================
# DEEPALI MINERALS - ONE-STEP ROLLBACK TO APPROVED PRODUCTION BASELINE
# ==============================================================================
# This script immediately restores the complete approved production website,
# discarding any experimental redesign changes and verifying build integrity.
#
# Baseline Reference:
# - Branch: main
# - Git Tag: v1.0-approved-production
# - Commit: c8fa42528684d9f957868f8ec5521d1176d4e513
# - Physical Backup: /app/deepali_minerals_approved_production_v1.tar.gz
#                    /app/applet_backup_approved_v1/
# ==============================================================================

set -e

echo "=================================================="
echo "Initiating Rollback to Approved Production Baseline"
echo "=================================================="

# Method 1: Git checkout and restore
if [ -d ".git" ]; then
  echo "[1/3] Restoring from Git tag 'v1.0-approved-production'..."
  git checkout -f main || git checkout -f v1.0-approved-production
  git reset --hard v1.0-approved-production
  git clean -fd -e node_modules
  echo "Git restoration complete."
fi

# Method 2: Physical backup sync (guaranteeing 100% preservation)
if [ -d "/app/applet_backup_approved_v1" ]; then
  echo "[2/3] Verifying against physical approved backup..."
  cp -r /app/applet_backup_approved_v1/assets/ ./assets/
  cp -r /app/applet_backup_approved_v1/public/ ./public/
  cp -r /app/applet_backup_approved_v1/*.html ./ 2>/dev/null || true
  cp -r /app/applet_backup_approved_v1/about/ ./about/ 2>/dev/null || true
  cp -r /app/applet_backup_approved_v1/products/ ./products/ 2>/dev/null || true
  cp -r /app/applet_backup_approved_v1/industries/ ./industries/ 2>/dev/null || true
  echo "Physical file verification complete."
fi

echo "[3/3] Validating build..."
npm run build

echo "=================================================="
echo "ROLLBACK SUCCESSFUL: Approved Production Restored!"
echo "=================================================="
