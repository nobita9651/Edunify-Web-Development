// utils/db.js
let db;

if (typeof window === "undefined") {
  // This block will only be executed on the server side
  const mysql = require("mysql2");

  db = mysql.createConnection({
    host: "localhost",
    user: "abhi",
    password: "Ijkl098765@",
    database: "school_db",
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      throw err;
    }
    console.log("Connected to MySQL database");
  });
}

export default db;
