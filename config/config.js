const { PGUSER, PGPASS, PGDB} = process.env;

module.exports = {
  "development": {
    "username": PGUSER,
    "password": PGPASS,
    "database": PGDB,
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
