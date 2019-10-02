FROM mhart/alpine-node:10

# install nodemon
RUN npm install nodemon -g

WORKDIR /usr/src/server

COPY package*.json ./

# move tmp directory and install package.json
RUN npm install

# es6를 사용하기 위한 babel설정
COPY ./.babelrc ./
COPY . .
EXPOSE 5000
# CMD는 명령어를 배열 형태로 배치하며 실제로 앱을 실행시키는 커맨드가 들어간다.
CMD ["npm", "start"]
