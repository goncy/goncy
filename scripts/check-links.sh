#!/usr/bin/env bash
# Checks every http(s) link and image URL in README.md.
# Usage: bash scripts/check-links.sh [README.md]
# Exit code 1 if any URL does not answer 2xx/3xx.
set -u

file="${1:-README.md}"
ua='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'

urls=$(
  {
    grep -oE '(href|src|srcset)="https?://[^"]+"' "$file" | sed -E 's/^[a-z]+="//; s/"$//'
    grep -oE '\]\(https?://[^) ]+\)' "$file" | sed -E 's/^\]\(//; s/\)$//'
  } | sort -u
)

failed=0
while IFS= read -r url; do
  [ -z "$url" ] && continue
  code=$(curl -s -o /dev/null -m 15 -A "$ua" -w '%{http_code}' "$url")
  case "$code" in
    2??|3??) status=ok ;;
    *) status=FAIL; failed=$((failed + 1)) ;;
  esac
  printf '%-4s %s  %s\n' "$status" "$code" "$url"
done <<< "$urls"

echo
if [ "$failed" -gt 0 ]; then
  echo "$failed URL(s) failed."
  exit 1
fi
echo "All URLs OK."
