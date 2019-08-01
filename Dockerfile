FROM node:10.15.3-alpine AS base-stage

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .


FROM base-stage AS build-stage

RUN npm run build


FROM nginx:alpine AS prod-stage

COPY --from=build-stage /usr/app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/default.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]