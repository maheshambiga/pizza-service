FROM node:12

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY dist /app

RUN npm install

COPY . /app

EXPOSE 3001

CMD ["npm", "run", "server:prod"]