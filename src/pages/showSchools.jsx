import db from "../utils/db";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export async function getServerSideProps() {
  try {
    const results = await query(
      "SELECT name, address, city, image FROM schools"
    );
    const schools = JSON.parse(JSON.stringify(results));
    return { props: { schools } };
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    return { props: { schools: [] } }; // Handle error gracefully
  }
}

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

export default function ShowSchools({ schools }) {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 style={{ fontWeight: "bold" }}>Schools List</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {schools.map((school, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                width: "80%", // Adjust the width as needed
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3>{school.name}</h3>
              <p>Address: {school.address}</p>
              <p>City: {school.city}</p>

              {/* Centered image */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={`/schoolImages/${school.image}`}
                  alt={school.name}
                  width={384}
                  height={288}
                />
              </div>

              {/* Styled "Visit" button */}
              <button
                style={{
                  marginTop: "10px",
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
