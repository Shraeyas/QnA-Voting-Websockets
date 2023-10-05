FROM node:20-alpine3.17

ENV NODE_ENV development
ENV DATABASE_URL postgres://postgresuser:postgrespassword@localhost:5432/db

RUN mkdir qna
WORKDIR /qna
COPY . .

RUN yarn install
CMD yarn build && yarn prod

EXPOSE 5000