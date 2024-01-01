// pages/api/searchSchools.js
import db from "../../utils/db";

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const results = await new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM schools WHERE name LIKE ?";
      db.query(queryString, [`%${query}%`], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
