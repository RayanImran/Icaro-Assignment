import { useState } from "react";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send user/pass to backend login route.
      // Adjust URL if your backend is at a different location.
      const response = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });

      // The backend should return { token: "..." }
      const { token } = response.data;
      // Save token in localStorage (or a global state/context if you prefer)
      localStorage.setItem("jwtToken", token);

      // Let the parent know login succeeded
      onLoginSuccess(token);
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow-md rounded">
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={username}
            className="border w-full px-3 py-2"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            className="border w-full px-3 py-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
