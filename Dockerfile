FROM mhart/alpine-node:10

# install nodemon
RUN npm install nodemon -g

WORKDIR /usr/src/server

COPY package.json ./

# move tmp directory and install package.json
RUN npm install

# es6를 사용하기 위한 babel설정
COPY .babelrc ./
COPY . .
EXPOSE 5000
CMD ["npm","run", "dev"]
