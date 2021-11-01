FROM ductn4/pm2:15-alpine
LABEL author="ductnn"

RUN mkdir -p home/npb
WORKDIR /home/npb

COPY package*.json ecosystem-test.json ./

RUN npm install \
    && node-prune

COPY . .
COPY .env .

EXPOSE 3000

ENTRYPOINT [ "pm2-runtime","start","ecosystem-test.json" ]
