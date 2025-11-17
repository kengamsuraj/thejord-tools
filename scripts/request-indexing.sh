#!/bin/bash
# Request immediate indexing for new pages
#
# USAGE:
#   ./scripts/request-indexing.sh
#
# NOTE: For Google Indexing API, you need to set up OAuth credentials
# See: https://developers.google.com/search/apis/indexing-api/v3/quickstart

echo "🚀 Requesting immediate indexing for new pages..."
echo ""

# New pages from v1.2.0
NEW_PAGES=(
  "https://thejord.it/cron-builder"
  "https://thejord.it/json-schema"
  "https://thejord.it/blog/cron-expression-builder"
  "https://thejord.it/blog/json-schema-converter"
)

echo "📋 Pages to index:"
for page in "${NEW_PAGES[@]}"; do
  echo "  - $page"
done
echo ""

# Method 1: Google Search Console URL Inspection (manual)
echo "📍 Method 1: Google Search Console (Manual)"
echo "   1. Go to: https://search.google.com/search-console"
echo "   2. Select property: thejord.it"
echo "   3. Use URL Inspection tool"
echo "   4. Paste each URL and click 'Request Indexing'"
echo ""

# Method 2: Bing URL Submission (API - requires key)
echo "📍 Method 2: Bing URL Submission API"
if [ -n "$BING_WEBMASTER_API_KEY" ]; then
  echo "   Bing API key found, submitting URLs..."

  for page in "${NEW_PAGES[@]}"; do
    # Bing URL Submission API
    # https://www.bing.com/webmasters/url-submission-api
    RESPONSE=$(curl -s -X POST "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${BING_WEBMASTER_API_KEY}" \
      -H "Content-Type: application/json" \
      -d "{\"siteUrl\":\"https://thejord.it\",\"url\":\"${page}\"}" \
      -w "%{http_code}")

    echo "   ✓ Submitted to Bing: $page (HTTP: $RESPONSE)"
  done
  echo ""
else
  echo "   ⚠️  BING_WEBMASTER_API_KEY not set"
  echo "   Set it in GitHub Secrets for automatic submission"
  echo "   Get your key: https://www.bing.com/webmasters/url-submission-api"
  echo ""
fi

# Method 3: IndexNow Protocol (Bing, Yandex, Seznam, Naver)
echo "📍 Method 3: IndexNow Protocol (Multi-Engine)"
if [ -n "$INDEXNOW_API_KEY" ]; then
  echo "   IndexNow API key found, notifying search engines..."

  # Create JSON payload with all URLs
  JSON_URLS=$(printf '"%s",' "${NEW_PAGES[@]}" | sed 's/,$//')

  # Submit to IndexNow
  curl -s -X POST "https://api.indexnow.org/indexnow" \
    -H "Content-Type: application/json" \
    -d "{
      \"host\": \"thejord.it\",
      \"key\": \"${INDEXNOW_API_KEY}\",
      \"keyLocation\": \"https://thejord.it/${INDEXNOW_API_KEY}.txt\",
      \"urlList\": [${JSON_URLS}]
    }"

  echo "   ✅ Submitted to IndexNow (Bing, Yandex, Seznam, Naver)"
  echo ""
else
  echo "   ⚠️  INDEXNOW_API_KEY not set"
  echo "   Generate one: any random string (e.g., UUID)"
  echo "   Add to GitHub Secrets and create /public/<key>.txt file"
  echo "   Learn more: https://www.indexnow.org/"
  echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Indexing requests completed!"
echo ""
echo "⏱️  Timeline:"
echo "   • Sitemap ping: 24-48 hours"
echo "   • Manual URL inspection: 1-2 days"
echo "   • IndexNow: Minutes to hours"
echo "   • Google Indexing API: Minutes (requires OAuth setup)"
echo ""
echo "📊 Check indexing status:"
echo "   Google: https://search.google.com/search-console"
echo "   Bing: https://www.bing.com/webmasters"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
