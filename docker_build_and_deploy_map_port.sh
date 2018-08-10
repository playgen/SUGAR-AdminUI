docker build . -t suagr-admin-demo
docker run --name sugar-admin-demo -p 59440:4200 -d sugar-admin-demo
