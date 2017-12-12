FROM microsoft/aspnetcore-build:lts

COPY . app/
WORKDIR app/

# COPY ./default /etc/nginx/sites-available/default

RUN npm update -g npm@3.x
RUN npm install -g gulpjs/gulp#4.0
RUN npm install -g gulp-cli --f

# NPM
RUN npm install
RUN bower install
RUN npm install grunt -g

RUN grunt build
EXPOSE 4200/tcp 

ENTRYPOINT grunt serve:dist