let db;

if (typeof window === "undefined") {
  const mysql = require("mysql2");

  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
