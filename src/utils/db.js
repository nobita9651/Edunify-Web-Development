let db;

if (typeof window === "undefined") {
  const mysql = require("mysql2");

  const pool = mysql.createPool({
    connectionLimit: 10, // Adjust as needed
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db = pool.promise();

  // Test the connection
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      throw err;
    }
    console.log("Connected to MySQL database");
    connection.release();
  });
}

export default db;
