FROM node:18

WORKDIR /app

COPY . .

RUN npm install express http-proxy-middleware

EXPOSE 80

CMD ["node", "server.js"]
