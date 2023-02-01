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
          table.increments("id").primary();
          table.string("ticketNum");
          table.string("name");
          table.string("seatType");
          table.string("seatClass");
          table.string("neighbors");
          table.string("exactSeat");
          table.integer("veteran");
          table.integer("disabled");
          table.integer("elderly");
        })
        .then(() => {
          console.log("Table 'passengers' created");
        })
        .catch((err) => {
          console.log(`Error creating table 'passengers': ${err}`);
        });
    }
  });

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
