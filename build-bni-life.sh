#!/bin/bash

mv nuxt.config.js nuxt.config.js.temp
mv nuxt.config.Development.BNI-Life.js nuxt.config.js

CURR_PATH=$(pwd)

npm run build

mv nuxt.config.js nuxt.config.Development.BNI-Life.js
mv nuxt.config.js.temp nuxt.config.js