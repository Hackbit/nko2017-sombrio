#!/bin/bash --login

set -e
curl -o- -L https://yarnpkg.com/install.sh | bash
export PATH=$HOME/.yarn/bin:$PATH
./scripts/install.sh
./scripts/distribute.sh
