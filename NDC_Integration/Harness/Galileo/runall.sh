#!/bin/sh
cd "$(dirname "$0")"
for g in g1 g2 g3 g4 g5 g6 g7 g8; do
  echo "START $g $(date -u +%H:%M:%S)" >> runall.log
  node run.js $g > $g.out 2>&1
  echo "END $g exit=$? $(date -u +%H:%M:%S)" >> runall.log
done
echo done > all.done
