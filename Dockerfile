FROM node:20-alpine3.17

RUN mkdir qna
WORKDIR /qna
COPY . .

RUN yarn install
CMD yarn build && yarn prod

EXPOSE 5000