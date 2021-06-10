## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation
```bash
# Run projuct on root
$ sudo yum install -y epel-release
$ sudo amazon-linux-extras install epel
$ sudo yum -y install nginx
$ sudo systemctl start nginx
$ sudo systemctl status nginx
$ sudo systemctl enable nginx
$ sudo vi /etc/nginx/nginx.conf
# Connect to EC2 server 
$ ssh -v -i m2m-key-pair.pem ec2-user@3.89.120.51

# Install yarn
$ sudo npm install yarn -g

# Node max space
$ export NODE_OPTIONS=--max-old-space-size=8192

# Install Redis
$ sudo amazon-linux-extras install redis4.0
# Check redis status
$ service redis status

# Start redis status
$ sudo service redis start

# Check if redis response "PONG"
$ redis-cli ping

# PM2 start server
$ pm2 start npm --name "m2m" -- run start:dev

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