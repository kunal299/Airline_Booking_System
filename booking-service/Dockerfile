FROM node:22.15.1-alpine

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

ENV PORT = 4003

EXPOSE 4003
CMD ["npm", "run", "dev"]