import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigateTo = (route) => {
    router.push(`/${route}`);
  };

  const handleSearch = async () => {
    console.log("Searching for:", searchQuery);

    try {
      // Make an API request to fetch school names based on the search query
      const response = await axios.get(
        `/api/searchSchools?query=${searchQuery}`
      );
      setSearchResults(response.data);

      // Show the dropdown if there are search results
      setShowDropdown(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSelectSchool = (schoolName) => {
    // Redirect to /showSchools with the selected school name
    router.push({
      pathname: "/showSchools",
      query: { name: schoolName },
    });

    // Clear search query and hide the dropdown
    setSearchQuery("");
    setShowDropdown(false);
  };

  return (
    <nav className="bg-gray-500 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className="text-white text-3xl font-bold cursor-pointer"
            onClick={() => navigateTo("")}
          >
            School Management
          </div>
        </div>

        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Search"
            className="p-3 rounded border"
            style={{ width: "600px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            className="absolute right-0 top-0 bottom-0 px-4"
            onClick={handleSearch}
          >
            Search
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                    onClick={() => handleSelectSchool(result.name)}
                  >
                    {result.name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div
            className="text-white cursor-pointer"
            onClick={() => navigateTo("")}
          >
            Home
          </div>
          <div
            className="text-white cursor-pointer"
            onClick={() => navigateTo("showSchools")}
          >
            Schools
          </div>
          <div
            className="text-white cursor-pointer"
            onClick={() => navigateTo("about")}
          >
            About
          </div>
          <div
            className="text-white cursor-pointer"
            onClick={() => navigateTo("contact")}
          >
            Contact
          </div>

          {/* Sign In button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              /* Add your sign-in logic here */
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
