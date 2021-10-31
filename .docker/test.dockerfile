FROM keymetrics/pm2:16-alpine
LABEL author="ductnn"

RUN mkdir -p home/npb
WORKDIR /home/npb

COPY package*.json ecosystem-test.json ./

RUN npm install

COPY . .
COPY .env .

EXPOSE 3000

ENTRYPOINT [ "pm2-runtime","start","ecosystem-test.json" ]
