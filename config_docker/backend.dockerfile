FROM node:14.2 AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

EXPOSE 4000
EXPOSE 4001
ENTRYPOINT ["node"]