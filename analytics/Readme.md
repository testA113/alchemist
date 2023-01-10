# Umami analytics self hosting on fly.io

In this folder, clone the umumi repo

```
git clone https://github.com/umami-software/umami.git
```

With yarn installed, go to the umami folder and run

```
yarn
```

Edit the Dockerfile according to the latest updates from https://community.fly.io/t/deploying-umami/5117 (currently https://community.fly.io/t/deploying-umami/5117/5)

If the image fails to build, change the base images in the dockerfile to node:16-alpine3.16

With flyctl installed, run

```
fly launch
```

I already have a database, so accept the defaults, and don't deploy yet. Notice that a file, fly.toml has been created.
Edit the fly.toml file with similar fields to below:

```
[env]
DATABASE_TYPE = "postgresql"
DATABASE_URL = "postgres://postgres:<password>@<db-name>.internal:5432/umami"
```

Create the 'umami' database in the existing fly.io server by running

```
fly flyctl proxy 15432:5432 -a <db-name>
```

Then adding a new database called 'umami' to this server with the postgres user.

If you will run Umami on another domain as your frontend client, then add these headers to the `next.config.js` file:

```
  { key: 'Access-Control-Allow-Credentials', value: 'true' },
  { key: 'Access-Control-Allow-Origin', value: '*' },
  { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
  {
    key: 'Access-Control-Allow-Headers',
    value:
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  },
```

To deploy, run
```
fly deploy
```