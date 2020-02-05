FROM node:13.3.0-alpine

WORKDIR '/app'

COPY package.json .

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install

COPY . .

CMD ["npm", "run", "prod"]