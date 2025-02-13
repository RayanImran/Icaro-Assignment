import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  // Threat states
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date_added");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const threatTypeLabels = {
    all: "All Threats",
    malware_download: "Malware Download",
  };

  useEffect(() => {
    // On first mount, check if we already have a token saved (refresh scenario).
    const savedToken = localStorage.getItem("jwtToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Whenever `page`, `filterType`, etc. changes, fetch new data
  useEffect(() => {
    const fetchThreats = async () => {
      if (!token) {
        // If no token, don't fetch yet.
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Attach Bearer token to Authorization header
        const response = await axios.get("http://localhost:8000/api/threats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            limit,
            filterType: filterType !== "all" ? filterType : undefined,
            sortBy,
            sortOrder,
          },
        });

        setThreats(response.data.threats);
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (err) {
        setError("Failed to load threats. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchThreats();
  }, [page, filterType, sortBy, sortOrder, token]);

  const toggleSortOrder = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setPage(1); // Reset to first page when sorting
  };

  // Handler when login is successful
  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true);
  };

  // Handler to log out
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    // If the user is not logged in, show the login form
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Otherwise, show the threats dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Threat Intelligence Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 w-full sm:w-auto">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Threat Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  {Object.entries(threatTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["host", "url", "threat_type", "date_added"].map((col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSortOrder(col)}
                    >
                      {col.replace(/_/g, " ").toUpperCase()}
                      {sortBy === col && (
                        <span className="ml-2">
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {threats.map((threat, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {threat.host}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      <a
                        href={threat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {threat.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {threat.threat_type.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(threat.date_added).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default App;
