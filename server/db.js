import path from "path";
import knex from "knex";

const dbPath = path.resolve(__dirname, "db/database.sqlite");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

knex.schema
  .hasTable("passengers")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("passengers", (table) => {
          table.increments("ticketID").primary();
          table.string("name");
        })
        .then(() => {
          console.log("Table 'passengers' created");
        })
        .catch((err) => {
          console.log(`Error creating table 'passengers': ${err}`);
        });
    }
  })
  .then(() => {
    console.log("Database ready");
  })
  .catch((err) => {
    console.log(`Error creating database: ${err}`);
  });

knex
  .select("*")
  .from("passengers")
  .then((data) => {
    console.log("Data: ", data);
  })
  .catch((err) => {
    console.log(`Error selecting from database: ${err}`);
  });

export default db;
