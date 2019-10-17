#FROM mhart/alpine-node:10
#
## install nodemon
#RUN npm install nodemon -g
#
#WORKDIR /usr/src/server
#
#COPY package.json ./
#
## move tmp directory and install package.json
#RUN npm install
#
## es6를 사용하기 위한 babel설정
#COPY .babelrc ./
#COPY . .
#EXPOSE 5000
#CMD ["npm","run", "dev"]

FROM mhart/alpine-node:10

RUN npm install -g express-generator

RUN express app
# /app 디렉토리를 WORKDIR 로 설정
WORKDIR /app

RUN ls
RUN cat package.json
# npm install 을 실행
RUN npm install

#가상 머신에 오픈할 포트
EXPOSE 3000

CMD ["npm", "start"]
