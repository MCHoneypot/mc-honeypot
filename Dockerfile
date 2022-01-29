FROM node:16-alpine
WORKDIR /usr/src/app

COPY package.json ./
RUN npm i

COPY . .

RUN npm run build

ENV NODE_ENV production
CMD [ "node", "dist/index.js" ]
USER node
