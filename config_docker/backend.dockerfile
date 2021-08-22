FROM node:14.2 AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

ENTRYPOINT ["node"]