FROM node:15.6 AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build
RUN npm run build:inbox

FROM nginx:stable

COPY --from=build /app/dist_ui_inbox/ /usr/share/nginx/html/

COPY ./config_nginx/compression.conf /etc/nginx/conf.d/
COPY ./config_nginx/default.conf /etc/nginx/conf.d/

COPY ./scripts/run_container.sh ./scripts/run_container.sh
RUN chmod +x scripts/run_container.sh

EXPOSE 80
ENTRYPOINT ["/bin/sh", "-c", "scripts/run_container.sh"]