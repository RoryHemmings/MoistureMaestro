FROM node:21.1.0-alpine3.18

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
COPY ./src ./src

RUN npm install

CMD npm run dev

EXPOSE 3000