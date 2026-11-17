#!/bin/bash
cd "$(dirname "$0")"
mkdir -p out
for g in g1 g2 g3 g4 g5 g6 g7 g8; do
  echo "START $g $(date -u +%T)" >> out/progress.log
  node run.js $g > out/$g.out 2>&1
  echo "END $g rc=$? $(date -u +%T)" >> out/progress.log
done
echo ALLDONE >> out/progress.log
