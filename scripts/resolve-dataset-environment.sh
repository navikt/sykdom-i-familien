#!/bin/bash
#set -x

# Resolves which dataset envrionemnt to use

case $GITHUB_REF in

    refs/heads/dev-*)
        export DATASET_ENV=production
        ;;

    refs/heads/master)
        export DATASET_ENV=production
        ;;

    *) echo "Not a valid branch"
esac