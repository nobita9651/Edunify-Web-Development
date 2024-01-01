let db;

if (typeof window === "undefined") {
  // This block will only be executed on the server side
  const mysql = require("mysql2");

  db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "abhi",
    password: process.env.DB_PASSWORD || "Ijkl098765@",
    database: process.env.DB_DATABASE || "school_db",
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
