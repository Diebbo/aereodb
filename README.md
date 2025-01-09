# aereodb

AereoDB is a simple, sql-based database for managing airports, airlines, flights, and passengers.

## Installation

run the docker-compose file to start the database

```bash
docker-compose up -d
```

enter the database container

```bash
mysql -u root -p -h 127.0.0.1
```

> Note that the password matches the one in the docker-compose file

## Web interface
A web interface to dialog with the database realized in Next.js, that provides options to execute CRUD operations on the data.

### Run
```bash
npm run dev
```
