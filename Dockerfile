# NPM
RUN npm install
RUN bower install
RUN npm install grunt

RUN grunt serve:dist