export const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "buyung",
    database: "kir",
  },
  pool: { min: 0, max: 10 },
});
