FROM node:10-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production
COPY . .

FROM node:10-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
ENV NODE_ENV="prod"
ENTRYPOINT ["npm", "run", "serve"]

