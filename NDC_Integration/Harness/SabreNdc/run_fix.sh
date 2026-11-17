#!/bin/bash
cd "$(dirname "$0")"
for g in g1 g2 g8; do
  echo "START $g $(date -u +%T)" >> out/progress2.log
  node run.js $g > out/${g}_b.out 2>&1
  echo "END $g rc=$? $(date -u +%T)" >> out/progress2.log
done
echo ALLDONE >> out/progress2.log
