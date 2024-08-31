FROM node:21-alpine


WORKDIR /usr/src/vault_boy

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY ./ frontend

CMD [ "yarn", "build" ]
