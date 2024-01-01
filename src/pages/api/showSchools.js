// pages/showSchools.js
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import db from "../../utils/db";

export default function ShowSchools({ schools }) {
  const [fetchedSchools, setFetchedSchools] = useState(schools);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const [rows] = await db.query("SELECT * FROM schools");
        setSchools(rows);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    if (!fetchedSchools.length) {
      fetchSchools();
    }
  }, [fetchedSchools]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">List of Schools</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {fetchedSchools.map((school) => (
            <div key={school.id} className="bg-white p-4 rounded shadow">
              <div className="mb-4">
                <Image
                  src={school.image}
                  alt={`${school.name} Image`}
                  width={300}
                  height={200}
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h2 className="text-lg font-bold">{school.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{school.address}</p>
              <p className="text-sm text-gray-500">{school.city}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

async function query(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
}
