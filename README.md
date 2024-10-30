# Yellow Taxi Trip Data


## System requirements

* [Git](https://git-scm.com)
* [PostgreSQL](https://www.postgresql.org)
* [PostGIS](https://postgis.net/documentation)
* [Node.js 18.18.x or newer](https://nodejs.org) (with npm)


## Preparing the database

First step, please preparing your database locally or your database provider.\
So, you have database name and database credentials.\
You have to enable postgis extension in your database engine (see [enabling PostGIS](https://postgis.net/documentation/getting_started)).


## Building

First, you have to set environment variables in your environment terminal which it's your building and deploying application environment

Windows
```shell
> SET "DBDATABASE=<YOUR_DATABASE_NAME>"
> SET "DBUSERNAME=<YOUR_DATABASE_NAME>"
> SET "DBPASSWORD=<YOUR_DATABASE_NAME>"
> SET "DBHOST=<YOUR_DATABASE_NAME>"
```

Linux
```shell
> EXPORT "DBDATABASE=<YOUR_DATABASE_NAME>"
> EXPORT "DBUSERNAME=<YOUR_DATABASE_NAME>"
> EXPORT "DBPASSWORD=<YOUR_DATABASE_NAME>"
> EXPORT "DBHOST=<YOUR_DATABASE_NAME>"
```

\
And then, run command line below in your terminal for building the application

```shell
> npm install
> npm run migrate
> npm run seed
> npm run build
```


## Deploying

You can deploy the application with the platform provider, or self-host on a Node.js server.

```shell
> npm run start
```
