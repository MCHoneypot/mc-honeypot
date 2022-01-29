FROM node:16
WORKDIR /usr/src/app

COPY package.json ./
RUN npm i

COPY . .

RUN npm run build

ENV NODE_ENV production
ENV PORT 25565

EXPOSE 25565
CMD [ "node", "dist/index.js" ]
USER node
