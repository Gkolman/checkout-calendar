FROM node:alpine
WORKDIR "/app"

COPY package*.json ./
RUN npm install
COPY . .

ENV PORT=3004

EXPOSE 3004
EXPOSE 27017

CMD ["npm", "start"]
