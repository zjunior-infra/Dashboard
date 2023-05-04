
# Crawler's Dashboard

Dashboard is resposible about monitor the Oppurtunities and do a CRUD operations, and it can run the Crawler workflow

All the jobs that has been crawled inserted to CrawledJob table, any modifictation on these data happens on this table, after pushing these data the inserted into two tables one for presistensy (ArchivedJob) and the other for the main table (Job)


## Contributing

Contributions are always welcome!

See the setup below for ways to get started.

Please adhere to this orgs `code of conduct`.


## Run Locally

Fork the project

then clone your Fork

```bash
  git clone https://link-you-your fork
```

Install dependencies

```bash
  npm ci
```
setup the database - we are using mysql with prisma orm

```bash
 docker-compose up
```
this is will run a container that has MySQL db on localhost:3306
with USERNAME: admin
Password: Password

Create your env

your connection string will be `mysql://admin@password@localhost:3306/db`

Generate the Schema

```bash
  npm run gen
```
to push your schema into the database
```bash
  npx prisma db push
```

This will add seeds jobs to your Crawled job Table
```bash
  npx prisma db seed
```

Start the Server
```bash
  npm run dev
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MAIN_DATABASE_URL`



## FAQ

#### Can I use something else rather than Docker ?

Yes, you can get a mysql database from any source you would like

we recommend PlantScale as it has a free tier that suits the development



