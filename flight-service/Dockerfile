FROM node:22.15.1-alpine

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

ENV PORT = 4002

EXPOSE 4002
CMD ["npm", "run", "dev"]