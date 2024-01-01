import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import db from "../utils/db";

async function query(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export async function getServerSideProps() {
  try {
    const results = await query(
      "SELECT name, address, city, image FROM schools"
    );
    const schools = JSON.parse(JSON.stringify(results));
    return { props: { schools } };
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    return { props: { schools: [] } };
  }
}

export default function Home({ schools }) {
  const router = useRouter();

  const navigateToAddSchool = () => {
    router.push("/addSchool");
  };

  const navigateToShowSchools = () => {
    router.push("/showSchools");
  };

  return (
    <div>
      <Navbar />
      <div className="relative h-96">
        <Image
          src="/schoolImages/12.jpg"
          alt="Banner Image"
          priority
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="container mx-auto mt-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            Welcome to the School Management System
          </h1>
          <div className="flex">
            <button
              onClick={navigateToAddSchool}
              className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Add School
            </button>
            <button
              onClick={navigateToShowSchools}
              className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Show Schools
            </button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 style={{ fontWeight: "bold" }}>Schools List</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {schools.map((school, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <Image
                  src={`/schoolImages/${school.image}`}
                  alt={school.name}
                  width={300}
                  height={200}
                />
              </div>
              <h3 style={{ textAlign: "center" }}>{school.name}</h3>
              <p style={{ textAlign: "center", marginBottom: "8px" }}>
                Address: {school.address}
              </p>
              <p style={{ textAlign: "center", marginBottom: "8px" }}>
                City: {school.city}
              </p>
              <button
                style={{
                  backgroundColor: "green",
                  border: "2px solid black",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                VISIT
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
