FROM node:18-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

ENV PORT=80
EXPOSE 80

CMD ["npm", "start"]
