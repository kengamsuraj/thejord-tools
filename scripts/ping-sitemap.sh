#!/bin/bash
# Ping sitemap to search engines after deployment
# This notifies Google and Bing about sitemap updates

SITEMAP_URL="https://thejord.it/sitemap.xml"

echo "🔔 Pinging sitemap to search engines..."
echo "Sitemap: $SITEMAP_URL"
echo ""

# Ping Google
echo "📍 Pinging Google..."
GOOGLE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://www.google.com/ping?sitemap=${SITEMAP_URL}")
if [ "$GOOGLE_RESPONSE" -eq 200 ]; then
  echo "✅ Google pinged successfully (HTTP $GOOGLE_RESPONSE)"
else
  echo "⚠️  Google ping returned HTTP $GOOGLE_RESPONSE (may still work)"
fi

echo ""

# Ping Bing
echo "📍 Pinging Bing..."
BING_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://www.bing.com/ping?sitemap=${SITEMAP_URL}")
if [ "$BING_RESPONSE" -eq 200 ]; then
  echo "✅ Bing pinged successfully (HTTP $BING_RESPONSE)"
else
  echo "⚠️  Bing ping returned HTTP $BING_RESPONSE (may still work)"
fi

echo ""
echo "✅ Sitemap ping completed!"
echo "Search engines will re-crawl the sitemap within 24-48 hours."
