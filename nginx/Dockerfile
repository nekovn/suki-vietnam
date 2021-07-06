# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app/
COPY frontend/oonavi/package*.json /app/
COPY frontend/oonavi/postcss.config.js /app/
COPY frontend/oonavi/tailwind.config.js /app/
RUN npm cache verify
RUN npm install
COPY frontend/oonavi /app/
RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY nginx/prod.conf /etc/nginx/nginx.conf
COPY backend/static /usr/src/app/static/
COPY backend/media /usr/src/app/media/
COPY --from=build-stage /app/dist /dist/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
