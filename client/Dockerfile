FROM node:16.10-alpine as base

# Working directory be app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm install -g serve

RUN npm run build

# nginx state for serving content
FROM nginx:1.15

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html
# Copy static assets from builder stage
COPY --from=base /app/build /usr/share/nginx/html
COPY --from=base /app/nginx.conf /etc/nginx/conf.d/default.conf

RUN export ${REACT_APP_API_URL}

EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]