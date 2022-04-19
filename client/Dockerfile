FROM node:16.10-alpine as base

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN rm -rf build

ARG API_URL

ENV REACT_APP_API_URL=$API_URL

RUN npm run build

FROM node:16.10-alpine

WORKDIR /app

COPY --from=base /app/build /app/build
COPY --from=base /app/express /app

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]

# # nginx state for serving content
# FROM nginx:1.15

# # Remove default nginx static assets
# RUN rm -rf /usr/share/nginx/html
# # Copy static assets from builder stage
# COPY --from=base /app/build /usr/share/nginx/html
# COPY --from=base /app/nginx.conf /etc/nginx/conf.d/default.conf

# RUN export ${REACT_APP_API_URL}

# EXPOSE 80

# # Containers run nginx with global directives and daemon off
# ENTRYPOINT ["nginx", "-g", "daemon off;"]