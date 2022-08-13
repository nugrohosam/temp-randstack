#!/bin/bash

mv nuxt.config.js nuxt.config.js.temp
mv nuxt.config.Development.BNI-Life.js nuxt.config.js

CURR_PATH=$(pwd)

npm run build
cd ..
zip -vr frontend.zip $CURR_PATH/ -x "*.DS_Store"

mv frontend.zip $CURR_PATH/

mv nuxt.config.js nuxt.config.Development.BNI-Life.js
mv nuxt.config.js.temp nuxt.config.js