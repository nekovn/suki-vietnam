FROM node:lts-alpine
# make the 'app' folder the current working directory
WORKDIR /app/

COPY oonavi/package*.json /app/
COPY oonavi/postcss.config.js /app/
COPY oonavi/tailwind.config.js /app/

RUN npm cache verify

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY ./oonavi .

EXPOSE 8080

CMD ["npm", "run", "serve"]