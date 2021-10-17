FROM node:15.5.1-alpine3.10

WORKDIR /

COPY ./package*.json main ./

RUN npm install

COPY . .

ENTRYPOINT [ "./main node_modules" ]

EXPOSE 3000

CMD ["npm", "start"]
