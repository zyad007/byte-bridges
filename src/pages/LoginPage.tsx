import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config.ts";
import Cookie from "js-cookie";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    const res = await fetch(config.BASE_URL + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const response = await res.json();

    if (res.ok) {
      navigate("/job");
      Cookie.set("token", response.data.token);
    } else {
      setError("Username and password doesn't match");
    }
  };

  return (
    <div className=" font-urbanist flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <div className="w-2/3"></div>
      <div className="w-1/3 h-full justify-center flex flex-col bg-white dark:bg-gray-800 shadow-lg p-6 space-y-4 transition-all">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
