#!/bin/bash
set -e

# get sha hash for unieque container-id
GIT_SHA=$(git rev-parse HEAD)

# google cloud project id (as command line arg)
PROJECT_ID=$1

# Current timestamp
TIMESTAMP=$(date +%s)

if [[ -z "$PROJECT_ID" ]]; then
  # exit if PROJECT_ID not provided
  echo "PROJECT_ID not provided"
  exit 1
else
  :
fi

# building docker containers for server and client
docker build -t gcr.io/$PROJECT_ID/scheduler-v2-client:$GIT_SHA-$TIMESTAMP -t gcr.io/$PROJECT_ID/scheduler-v2-client:latest ./client
docker build -t gcr.io/$PROJECT_ID/scheduler-v2-server:$GIT_SHA-$TIMESTAMP -t gcr.io/$PROJECT_ID/scheduler-v2-server:latest ./server

# pushing to google container registary
docker push gcr.io/$PROJECT_ID/scheduler-v2-client:latest
docker push gcr.io/$PROJECT_ID/scheduler-v2-client:$GIT_SHA-$TIMESTAMP
docker push gcr.io/$PROJECT_ID/scheduler-v2-server:latest
docker push gcr.io/$PROJECT_ID/scheduler-v2-server:$GIT_SHA-$TIMESTAMP

