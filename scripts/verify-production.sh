#!/bin/bash
# Production Verification Script
# Run this before deploying to production
# Usage: ./scripts/verify-production.sh

set -e

echo "🔍 Vercel Production Verification Script"
echo "======================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_pass() {
  echo -e "${GREEN}✓${NC} $1"
}

check_fail() {
  echo -e "${RED}✗${NC} $1"
  exit 1
}

check_warn() {
  echo -e "${YELLOW}⚠${NC} $1"
}

# Check 1: Node version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v)
if [[ $NODE_VERSION == v18* ]] || [[ $NODE_VERSION == v20* ]] || [[ $NODE_VERSION == v22* ]]; then
  check_pass "Node.js version: $NODE_VERSION"
else
  check_warn "Node.js version: $NODE_VERSION (18.x+ recommended)"
fi

# Check 2: pnpm version
echo ""
echo "📦 Checking pnpm version..."
PNPM_VERSION=$(pnpm -v)
check_pass "pnpm version: $PNPM_VERSION"

# Check 3: Environment variables
echo ""
echo "🔐 Checking environment variables..."
if [ -f .env ]; then
  check_pass ".env file found"
  
  # Check for required variables
  REQUIRED_VARS=("DATABASE_URL" "CLERK_PUBLISHABLE_KEY" "CLERK_SECRET_KEY" "SESSION_SECRET")
  
  for var in "${REQUIRED_VARS[@]}"; do
    if grep -q "^$var=" .env; then
      check_pass "Environment variable: $var"
    else
      check_fail "Missing environment variable: $var"
    fi
  done
else
  check_fail ".env file not found. Copy .env.example to .env and fill in values."
fi

# Check 4: TypeScript compilation
echo ""
echo "🔨 Checking TypeScript compilation..."
if pnpm run typecheck > /dev/null 2>&1; then
  check_pass "TypeScript compilation successful"
else
  check_fail "TypeScript compilation failed"
fi

# Check 5: Build
echo ""
echo "🏗️  Building application..."
if pnpm run verify:production > /dev/null 2>&1; then
  check_pass "Build successful"
else
  check_fail "Build failed"
fi

# Check 6: Build artifacts
echo ""
echo "📂 Checking build artifacts..."
if [ -d "artifacts/noteora/dist/public" ]; then
  check_pass "Frontend build artifact found"
  
  # Check file sizes
  SIZE=$(du -sh artifacts/noteora/dist/public | cut -f1)
  check_pass "Frontend size: $SIZE"
else
  check_fail "Frontend build artifact not found"
fi

# Check 7: vercel.json
echo ""
echo "⚙️  Checking Vercel configuration..."
if [ -f "vercel.json" ]; then
  check_pass "vercel.json found"
  
  # Basic JSON validation
  if pnpm exec --yes jq empty vercel.json 2>/dev/null; then
    check_pass "vercel.json is valid JSON"
  else
    check_warn "Could not validate vercel.json (jq not available)"
  fi
else
  check_fail "vercel.json not found"
fi

# Check 8: .gitignore
echo ""
echo "🔒 Checking security configuration..."
if grep -q "\.env" .gitignore; then
  check_pass ".env is in .gitignore"
else
  check_fail ".env is NOT in .gitignore (security risk!)"
fi

# Check 9: Dependencies
echo ""
echo "📚 Checking dependencies..."
if [ -f "pnpm-lock.yaml" ]; then
  check_pass "pnpm-lock.yaml found"
else
  check_warn "pnpm-lock.yaml not found (may not be in Git)"
fi

# Check 10: Documentation
echo ""
echo "📖 Checking documentation..."
if [ -f "DEPLOYMENT.md" ]; then
  check_pass "DEPLOYMENT.md found"
else
  check_warn "DEPLOYMENT.md not found"
fi

if [ -f "PRODUCTION_CHECKLIST.md" ]; then
  check_pass "PRODUCTION_CHECKLIST.md found"
else
  check_warn "PRODUCTION_CHECKLIST.md not found"
fi

# Summary
echo ""
echo "======================================="
echo "✅ Production verification complete!"
echo ""
echo "Next steps:"
echo "  1. Review DEPLOYMENT.md"
echo "  2. Complete PRODUCTION_CHECKLIST.md"
echo "  3. Push to Git repository"
echo "  4. Deploy to Vercel: git push origin main"
echo ""
