#!/bin/bash
set -e

# get sha hash for unieque container-id
GIT_SHA=$(git rev-parse HEAD)

# google cloud project id (as command line arg)
PROJECT_ID=$1

if [[ -z "$PROJECT_ID" ]]; then
  # exit if PROJECT_ID not provided
  echo "PROJECT_ID not provided"
  exit 1
else
  :
fi

# building docker containers for server and client
docker build -t ritwik310/scheduler-v2-client ./client/Dockerfile ./client
docker build -t ritwik310/scheduler-v2-server ./server/Dockerfile ./server

# pushing to google container registary
docker tag ritwik310/scheduler-v2-client gcr.io/$PROJECT_ID/scheduler-v2-client:latest
docker tag ritwik310/scheduler-v2-server gcr.io/$PROJECT_ID/scheduler-v2-server:$GIT_SHA
docker tag ritwik310/scheduler-v2-client gcr.io/$PROJECT_ID/scheduler-v2-client:latest
docker tag ritwik310/scheduler-v2-server gcr.io/$PROJECT_ID/scheduler-v2-server:$GIT_SHA

# pushing to google container registary
docker push gcr.io/$PROJECT_ID/scheduler-v2-client:latest
docker push gcr.io/$PROJECT_ID/scheduler-v2-server:$GIT_SHA
docker push gcr.io/$PROJECT_ID/scheduler-v2-client:latest
docker push gcr.io/$PROJECT_ID/scheduler-v2-server:$GIT_SHA
