FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client curl

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

COPY start.sh /app/start.sh

RUN chmod +x /app/start.sh

EXPOSE 4000

CMD ["/app/start.sh"]
