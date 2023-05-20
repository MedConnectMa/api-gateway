FROM node:20.2-alpine3.16 as base

# set working directory
WORKDIR /app

# install dependencies
COPY package.json .
RUN npm install

# copy source code
COPY . .

# run server
CMD ["npm", "start"]
