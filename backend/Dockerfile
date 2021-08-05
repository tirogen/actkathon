FROM node:10-alpine
WORKDIR /server
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "start:prod"]