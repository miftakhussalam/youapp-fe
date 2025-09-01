"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import BackNav from "../components/BackNav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";

export default function RegisterPage(): JSX.Element {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Password and Confirm Password do not match");
      return;
    }

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      // redirect ke profile
      router.push("/profile");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* Back Navigation */}
      <div className="p-6 flex items-start w-full">
        <BackNav href="/" />
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6">Register</h1>

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            {/* Email */}
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />

            {/* Username */}
            <input
              type="text"
              placeholder="Create Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Register Button */}
            <Button  type="submit" disabled={loading} className="w-full py-3 rounded-lg text-white font-semibold mt-2 disabled:opacity-50" >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          {/* Link to Login */}
          <p className="mt-4 text-center text-gray-300">
            Have an account?{" "}
            <Link href="/login" className="text-cyan-400 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
