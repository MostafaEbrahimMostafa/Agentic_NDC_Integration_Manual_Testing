#!/bin/sh
# usage: run_all.sh <Supplier> [group ...]   default groups: g1..g8. Runs the groups one after another
# (suppliers are called sequentially); progress and per-group output go to <Supplier>/out/.
cd "$(dirname "$0")"
SUP="$1"; [ -n "$SUP" ] || { echo "usage: run_all.sh <Supplier> [group ...]"; exit 2; }
shift; LIST="${*:-g1 g2 g3 g4 g5 g6 g7 g8}"
OUT="$SUP/out"; mkdir -p "$OUT"
for g in $LIST; do
  echo "START $g $(date -u +%H:%M:%S)" >> "$OUT/progress.log"
  node run.js "$SUP" "$g" > "$OUT/$g.out" 2>&1
  echo "END $g exit=$? $(date -u +%H:%M:%S)" >> "$OUT/progress.log"
done
echo ALLDONE >> "$OUT/progress.log"
