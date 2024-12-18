#!/bin/bash

cd api

yarn

yarn build

yarn start &

cd ../web

yarn

yarn build

yarn preview