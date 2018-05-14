docker build . -t sugar-admin
docker run --name sugar-admin -p 59440:4200 -d sugar-admin