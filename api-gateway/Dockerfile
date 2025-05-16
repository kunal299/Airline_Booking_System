#Instructions arguments (format of commands)

# Use an official node.js runtime as the base image
FROM node:22.15.1-alpine

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

ENV PORT = 4000

EXPOSE 4000
CMD ["npm", "run", "dev"]