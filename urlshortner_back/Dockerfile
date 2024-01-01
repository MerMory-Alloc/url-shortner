FROM node:18-slim

WORKDIR /usr/local/app

COPY package*.json ./

RUN npm ci && \
 npm cache clean --force

COPY . .

ENV PORT 4000
EXPOSE 4000

CMD ["node", "server.js"]