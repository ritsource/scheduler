# Building Images
docker build -t ritwik310/scheduler-client:latest -t ritwik310/scheduler-client:$GIT_SHA -f ./client/Dockerfile ./client
docker build -t ritwik310/scheduler-server:latest -t ritwik310/scheduler-server:$GIT_SHA -f ./server/Dockerfile ./server

# Pushing Images (latest) to Docker-Hub
docker push ritwik310/scheduler-client:latest
docker push ritwik310/scheduler-server:latest

# Pushing Images (tagged) to Docker-Hub
docker push ritwik310/scheduler-client:$GIT_SHA
docker push ritwik310/scheduler-server:$GIT_SHA