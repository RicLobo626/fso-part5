FROM node:20 as build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm test

RUN npm run build

# Everything before this is gone, except for dist
FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html