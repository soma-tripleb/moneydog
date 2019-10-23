FROM redwolfgang20/nginx-node
#app 폴더 만들기 - NodeJS 어플리케이션 폴더
RUN mkdir -p /app
#어플리케이션 폴더를 Workdir로 지정 - 서버가동용
WORKDIR /app
COPY ./ /app

RUN rm /etc/nginx/conf.d/default.conf
COPY conf/conf.d/default.conf /etc/nginx/conf.d/default.conf
RUN rm /usr/share/nginx/html/index.html

ADD versioning.sh /
RUN chmod 755 /versioning.sh
RUN /versioning.sh

RUN cp index.html /usr/share/nginx/html/index.html
RUN cat /usr/share/nginx/html/index.html

RUN ls
RUN cat index.html
# install nodemon
RUN npm install nodemon -g

# move tmp directory and install package.json
RUN npm install

EXPOSE 80

ADD start.sh /
CMD ["/start.sh"]




