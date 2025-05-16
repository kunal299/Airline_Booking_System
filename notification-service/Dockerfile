FROM node:22.15.1-alpine

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

ENV PORT = 4004

EXPOSE 4004
CMD ["npm", "run", "dev"]