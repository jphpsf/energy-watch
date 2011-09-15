#!/bin/bash

# Merge CSS together
cat jquery.mobile-1.0b3.css pan-prototype.css > pan.min.css

# Merge JS together 
cat jquery-1.6.2.min.js jquery.mobile-1.0b3.min.js smoothie.js pan-prototype.js > pan.js
java -jar build/yuicompressor-2.4.2.jar -o pan.min.js pan.js

# First prepare index.html
#cp devel.html index.html

# TODO
