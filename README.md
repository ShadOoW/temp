# Create EC2 instance
1. Step 1: Choose Amazon Linux 2 AMI (HVM), SSD Volume Type **64-bit (x86)**.
2. Step 2: Choose Instance Type **t2.medium** and click on *Configure Instance Details*.
3. Step 3: Keep Instance Details as default and click on *Add Storage*.
4. Step 4: Keep as default click on *Add Tags*.
5. Step 5: click on *Configure Security Group*.
6. Step 6:
    - Rename the *Security group name*.
    - The first row on the table is of type SSH, Select on the Source is anywhere.
    - Click **Add Rule** select custom TCP with a port of 3000 and source anywhere.
    - Click **Add Rule** select custom TCP with a port of 80 and source anywhere.
7. Step 7: Review Instance Launch click on *Launch* and select *Create a new key pair* name it and *VERY IMPORTANT* to download it

# EC2 Server Configuration
1. Connect with SSH
    - Find your .pem key file on your computer.
    - Open Terminal and type the following:
    ```bash
    $ chmod 400 /path/to/your/file/your-key-pair.pem
    ```
    - Connect to server
    ```bash
    $ ssh -v -i your-key-pair.pem ec2-user@your-instance-ip
    ```
2. Install Node.js by using a Node Version Manager (NVM):
    ```bash
    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
    ```
    - activate NVM
    ```bash
    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
    ```
    - Install the latest version available
    ```bash
    $ nvm install node
    ```
    - Verify that Node.js is installed
    ```bash
    $ node -v
    ```
3. Install Git
    ```bash
    # Perform a quick update on your instance:
    $ sudo yum update -y
    # Install git in your EC2 instance
    $ sudo yum install git -y
    ```
4. Generate Ssh key
    ```bash
    #genetare the key by press enter on all question
    $ ssh-keygen -t rsa
    # get the key and copy it
    $ vi ~/.ssh/id_rsa.pub
    ```
    - Add the key to repository
5. Clone the projet
    ```bash
    $ git clone git@github.com:ennaimy/m2m.git
    ```
6. Install Redis
    ```bash
    # Install Redis
    $ sudo amazon-linux-extras install redis4.0
    # Check redis status
    $ service redis status
    # Start redis status
    $ sudo service redis start
    # Check if redis response "PONG"
    $ redis-cli ping
    ```
7. Install Nginx
    ```bash
    # Install nginx
    $ sudo amazon-linux-extras install nginx1
    # Start nginx status
    $ sudo systemctl start nginx
    # Check nginx status
    $ sudo systemctl status nginx
    # Enable nginx
    $ sudo systemctl enable nginx
    ```
8. Install yarn
    ```bash
    $ npm install yarn -g
    ```
9. Install pm2
    ```bash
    $ npm install pm2@latest -g
    # Generate a pm2 startup script
    $ pm2 startup
    ```
10. Install project packages
    ```bash
    # Install project packages
    $ cd ~/path/to/project/m2m # by default in ~/m2m
    & yarn
    ```
11. Setup the .env file
    ```bash
    # create .env file in the projecy root
    $ vi ~/path/to/project/m2m/.env # by default vi ~/m2m/.env
    ```
    ``` javascript
    # copy past those variable and change the "*********" by the correct credential
    MYSQL_HOST=*********
    MYSQL_PORT=3306
    MYSQL_USER=*********
    MYSQL_PASSWORD=*********
    MYSQL_DATABASE=*********

    PORT=8080
    MODE=DEV
    RUN_MIGRATIONS=true

    REDIS_HOST=localhost
    REDIS_PORT=6379

    AWS_SES_ACCESS_KEY_ID=*********
    AWS_SES_SECRET_ACCESS_KEY=*********

    JWT_SECRET_KEY=secretkey
    JWT_EXPIRES_IN=4h
    ```
12. Execute migrations to automatically create tables on database
    ```bash
    $ npm run typeorm:migration:run
    ```
13. 
## Installation
```bash
$ sudo vi /etc/nginx/nginx.conf
# PM2 start server
$ pm2 start npm --name "m2m" -- run start:dev
```

## Running the app

database connection configuration on .env

```bash
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