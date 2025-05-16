FROM node:22.15.1-alpine

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

ENV PORT = 4001

EXPOSE 4001
CMD ["npm", "run", "dev"]