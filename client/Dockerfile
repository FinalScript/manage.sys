FROM node:16.10-alpine as base

# Working directory be app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL $REACT_APP_API_URL

RUN npm run build

FROM node:16.10-alpine

WORKDIR /app

COPY --from=base /app/build ./build
COPY  express/ ./

RUN npm install

EXPOSE 443

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["node", "app"]