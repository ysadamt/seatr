import path from "path";
import { fileURLToPath } from "url";
import knex from "knex";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "database.sqlite");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

db.schema
  .hasTable("passengers")
  .then((exists) => {
    if (!exists) {
      return db.schema
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
db.schema
  .hasTable("preferences")
  .then((exists) => {
    if (!exists) {
      return db.schema
        .createTable("preferences", (table) => {
          table.increments("ticketID").primary();
          table.string("seatType");
          table.string("seatClass");
          table.string("neighbors");
          table.string("exactSeat");
        })
        .then(() => {
          console.log("Table 'preferences' created");
        })
        .catch((err) => {
          console.log(`Error creating table 'preferences': ${err}`);
        });
    }
  })
db.schema
  .hasTable("flags")
  .then((exists) => {
    if (!exists) {
      return db.schema
        .createTable("flags", (table) => {
          table.increments("ticketID").primary();
          table.boolean("veteran");
          table.boolean("disabled");
          table.boolean("elderly");
        })
        .then(() => {
          console.log("Table 'flags' created");
        })
        .catch((err) => {
          console.log(`Error creating table 'flags': ${err}`);
        });
    }
  })
  .then(() => {
    console.log("Database ready");
  })
  .catch((err) => {
    console.log(`Error creating database: ${err}`);
  });

  // inner join passengers with preferences and flags
  db.from("passengers").innerJoin("preferences", "passengers.ticketID", "preferences.ticketID")
  db.from("passengers").innerJoin("flags", "passengers.ticketID", "flags.ticketID")

// db
//   .select("*")
//   .from("passengers")
//   .then((data) => {
//     console.log("Data: ", data);
//   })
//   .catch((err) => {
//     console.log(`Error selecting from database: ${err}`);
//   });

export default db;
