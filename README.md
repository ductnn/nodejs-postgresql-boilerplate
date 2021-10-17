# CRUD API Node Server Boilerplate
[![CI](https://github.com/ductnn/nodejs-postgresql-boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/ductnn/nodejs-postgresql-boilerplate/actions/workflows/ci.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/ductnn/nodejs-postgresql-boilerplate/pulls) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A boilerplate/starter project for quickly building CRUD API using Node.js,
Express, Pug and Postgres.

## Project structure

```bash
.
├── ./api
├── ./config
├── ./controllers
├── ./middlewares
├── ./models
├── ./public
├── ./routes
├── ./scratch
├── ./validate
├── ./views
├── ./key.js
└── ./server.js
```

## Install

Clone the repo:

```bash
git clone https://github.com/ductnn/nodejs-postgresql-boilerplate.git
cd nodejs-postgresql-boilerplate
```

Install the dependencies:

```bash
npm install
```

**Note:** Install nodemon (optional) on golbal scope in your host machine (flag
-g) using npm

Set the enviroment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Start API server:

```bash
npm start
```

or

```bash
npm run dev
```

**Note:** If you don't use `nodemon` start server by `node server.js`

## Contribution
Contributions are more than welcome in this project!

## License
The MIT License (MIT). Please see [LICENSE](LICENSE) for more information.
