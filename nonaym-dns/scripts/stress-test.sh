#!/bin/bash
# Technitium DNS Stress Test
# Bang the server with DNS queries to populate logs and check blocking

TARGET="192.168.1.208"
TOTAL=100
AD_DOMAINS="doubleclick.net googlesyndication.com googletagmanager.com googleadservices.com googleadservices.com ads.google.com criteo.com appnexus.com quantserve.com scorecardresearch.com hotjar.com mixpanel.com segment.com sentry.io pendo.io heap.io intercom.io zendesk.com facebook.net fbcdn.net instagram.com twitter.com twimg.com t.co google-analytics.com tracking.msn.com adobe.com adobe-dns.net amazon-adsystem.com googletag.g.doubleclick.net adnexus.net outbrain.com taboola.com yandexadserv.com rambler.ru yandex.ru mail.ru ok.ru vk.com"
LEGIT_DOMAINS="google.com youtube.com example.com cloudflare.com github.com reddit.com stackoverflow.com wikipedia.org amazon.com netflix.com twitch.com discord.com slack.com apple.com microsoft.com spotify.com"

echo "========================================="
echo "  Technitium DNS Server Stress Test"
echo "  Target: $TARGET"
echo "  Queries: $TOTAL"
echo "========================================="
echo ""

BLOCKED=0
RESOLVED=0
TIMEOUT=0
ERROR=0

for i in $(seq 1 $TOTAL); do
  if (( i <= TOTAL / 2 )); then
    # Half ad domains (should be blocked)
    DOMAIN=$(echo $AD_DOMAINS | tr ' ' '\n' | shuf -n1)
  else
    # Half legit domains (should resolve)
    DOMAIN=$(echo $LEGIT_DOMAINS | tr ' ' '\n' | shuf -n1)
  fi
  
  # Use dig with 1 second timeout
  RESULT=$(dig @192.168.1.208 $DOMAIN +short +timeout=2 +tries=1 2>/dev/null)
  EXIT_CODE=$?
  
  if [ $EXIT_CODE -eq 143 ]; then
    TIMEOUT=$((TIMEOUT + 1))
  elif echo "$RESULT" | grep -qi "NXDOMAIN\|0.0.0.0"; then
    BLOCKED=$((BLOCKED + 1))
  elif [ -n "$RESULT" ]; then
    RESOLVED=$((RESOLVED + 1))
  else
    ERROR=$((ERROR + 1))
  fi
  
  # Progress indicator
  if (( i % 20 == 0 )); then
    echo "  $i/$TOTAL done (blocked: $BLOCKED, resolved: $RESOLVED)"
  fi
done

echo ""
echo "========================================="
echo "  RESULTS"
echo "========================================="
echo "  Blocked (NXDOMAIN/0.0.0.0):  $BLOCKED"
echo "  Resolved to real IP:          $RESOLVED"
echo "  Timeout/Error:                $TIMEOUT"
echo "========================================="
echo ""
echo "  Blocking rate: $(( BLOCKED * 100 / TOTAL ))%"
echo "========================================="
echo ""
echo "Check the dashboard Logs tab to see individual queries."
