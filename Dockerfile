FROM node:18.4.0-alpine as dependencies
WORKDIR /blog-web-app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:18.4.0-alpine as builder
WORKDIR /blog-web-app
COPY . .
COPY --from=dependencies /blog-web-app/node_modules ./node_modules

ARG FIREBASE_API_KEY_ARG
ENV FIREBASE_API_KEY $FIREBASE_API_KEY_ARG
ARG FIREBASE_AUTH_DOMAIN_ARG
ENV FIREBASE_AUTH_DOMAIN $FIREBASE_AUTH_DOMAIN_ARG
ARG FIREBASE_PROJECT_ID_ARG
ENV FIREBASE_PROJECT_ID $FIREBASE_PROJECT_ID_ARG
ARG FIREBASE_STORAGE_BUCKET_ARG
ENV FIREBASE_STORAGE_BUCKET $FIREBASE_STORAGE_BUCKET_ARG
ARG FIREBASE_APP_ID_ARG
ENV FIREBASE_APP_ID $FIREBASE_APP_ID_ARG
ARG BACKEND_ARG
ENV BACKEND $BACKEND_ARG

RUN npm run build

FROM node:18.4.0-alpine as runner
WORKDIR /blog-web-app

COPY --from=builder /blog-web-app/next.config.js ./
COPY --from=builder /blog-web-app/public ./public
COPY --from=builder /blog-web-app/.next ./.next
COPY --from=builder /blog-web-app/node_modules ./node_modules
COPY --from=builder /blog-web-app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]