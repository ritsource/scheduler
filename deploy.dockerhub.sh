docker build -t ritwik310/scheduler-client:latest -t ritwik310/scheduler-client:$GIT_SHA -f ./client/Dockerfile ./client
docker build -t ritwik310/scheduler-server:latest -t ritwik310/scheduler-server:$GIT_SHA -f ./server/Dockerfile ./server
docker build -t ritwik310/scheduler-nginx:latest -t ritwik310/scheduler-nginx:$GIT_SHA -f ./nginx/Dockerfile ./nginx

docker push ritwik310/scheduler-client:latest
docker push ritwik310/scheduler-server:latest
docker push ritwik310/scheduler-nginx:latest

docker push ritwik310/scheduler-client:$GIT_SHA
docker push ritwik310/scheduler-server:$GIT_SHA
docker push ritwik310/scheduler-nginx:$GIT_SHA