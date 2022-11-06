FROM node:16-alpine as deps-dev
WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn

FROM node:16-alpine as deps-prod
WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn --production

FROM node:16-alpine as build
WORKDIR /code
COPY --from=deps-dev /code/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:16-alpine
WORKDIR /code
COPY --from=deps-prod /code/node_modules ./node_modules
COPY --from=build /code/dist ./dist
COPY . .
CMD yarn serve
