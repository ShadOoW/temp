## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# Install yarn
$ sudo npm install yarn -g

# Node max space
$ export NODE_OPTIONS=--max-old-space-size=8192
$ sudo amazon-linux-extras install redis4.0
$ service redis status
$ sudo service redis start
$ redis-cli ping
# Install packages
$ yarn
```

## Running the app

database connection configuration on .env

```bash
# create database
$ npm run start:dev:db

# generate migrations
$ npm run typeorm:migration:generate -- my_init

# execute migrations
$ npm run typeorm:migration:run

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Create Module Steps
- Create module entities in "src > models"
- Create module DTO 
- Create module > controller > service
- Create module models
- Generate migrations
- Defining seed data
