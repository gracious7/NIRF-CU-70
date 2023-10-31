FROM node:16

WORKDIR /cache

COPY package.json .
# COPY package-lock.json .
RUN npm install --force

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY . .

EXPOSE 3000