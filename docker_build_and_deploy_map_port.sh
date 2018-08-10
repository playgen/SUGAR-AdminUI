docker build . -t -v2
docker run --name sugar-admin-v2 -p 59440:4200 -d sugar-admin-v2
