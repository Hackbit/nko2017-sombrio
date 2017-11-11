#!/bin/bash -e

GITHUB_DOWNLOAD="https://github.com/Hackbit/nko2017-sombrio/releases/download"

export MAC_DOWNLOAD_URL="${GITHUB_DOWNLOAD}/${TRAVIS_TAG}/Sombrio-darwin-x64.zip"
export WINDOWS_DOWNLOAD_URL="${GITHUB_DOWNLOAD}/${TRAVIS_TAG}/Sombrio-linux-x64.zip"
export LINUX_DOWNLOAD_URL="${GITHUB_DOWNLOAD}/${TRAVIS_TAG}/Sombrio-win32-x64.zip"

pushd website && yarn install && yarn dist && popd

rm -rf build-website
mkdir build-website

cp -r website/dist/* build-website/
cp website/index.php build-website/index.php
cp website/composer.json build-website/composer.json

pushd build-website && zip -r website.zip ./ && popd
mv build-website/website.zip .
rm -rf build-website
