#!/usr/bin/bash

i=0
while [ $i -lt 5 ]
do
   ./open.sh
   sleep 0.5
   ./close.sh
   sleep 0.5
   i=`expr $i + 1`
done
