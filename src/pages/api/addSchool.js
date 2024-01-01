// addschool.js
import db from "../../utils/db";
import multiparty from "multiparty";
import fs from "fs-extra";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }

    const { name, address, city, state, contact, email_id } = fields;
    const image = files.image ? files.image[0] : null;

    try {
      if (!image || !image.path) {
        throw new Error("Image file is missing or invalid");
      }

      // Save the image file using fs-extra with its original filename
      const originalFilename = image.originalFilename;
      const imageExtension = path.extname(originalFilename);
      const baseFilename = path.basename(originalFilename, imageExtension);
      const uniqueFilename = `${baseFilename}_${Date.now()}${imageExtension}`;
      const imagePath = path.join("schoolImages", uniqueFilename);

      // Move the file to the destination
      await fs.move(image.path, imagePath).catch((moveError) => {
        console.error("Error moving file:", moveError);
        throw moveError; // Rethrow the error
      });

      // Get a promise-based connection
      const con = await db.promise();

      // Insert data into the database using promises
      const [result] = await con
        .query(
          "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, address, city, state, contact, originalFilename, email_id]
        )
        .catch((dbError) => {
          console.error("Error executing database query:", dbError);
          throw dbError; // Rethrow the error
        });

      console.log("School added successfully!");
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error adding school:", error);

      // Log the specific error message
      console.error(error.message);

      // Delete the file if there's an error and image.path is defined
      if (image && image.path) {
        await fs.unlink(image.path);
      }

      // Return a more informative error response
      res.status(500).json({ success: false, error: error.message });
    }
  });
}
