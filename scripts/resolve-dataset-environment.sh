#!/bin/bash
#set -x

case $GITHUB_REF in

    refs/heads/dev-*)
        export DATASET_ENV=staging
        echo "Exported DATASET_ENV=staging"
        ;;

    refs/heads/master)
        export DATASET_ENV=production
        echo "Exported DATASET_ENV=production"
        ;;

    *) echo "Not a valid branch"
esac
