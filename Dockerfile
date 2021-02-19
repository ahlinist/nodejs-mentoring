FROM node:12
WORKDIR /usr/src/app
RUN npm install
COPY . .
EXPOSE 3030
CMD [ "npm", "run", "start-prod" ]
