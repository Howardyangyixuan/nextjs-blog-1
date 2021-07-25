FROM node:12
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN yarn compile
RUN yarn m:run
RUN node dist/seed.js
EXPOSE 3000
CMD [ "yarn", "start" ]
