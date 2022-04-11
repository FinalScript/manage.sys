FROM node:16 as base

FROM base as development

# Working directory be app
WORKDIR /app

COPY package.json /app

RUN npm install --silent

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]

FROM base as build

RUN npm run build --production

FROM base as production

RUN npm install -g serve

EXPOSE 3000

CMD ["serve","-s","build"]