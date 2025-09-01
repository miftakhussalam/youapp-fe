"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import BackNav from "../components/BackNav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const { login } = useAuth();

  console.log(useAuth());

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username: email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }

      const data = await res.json();

      // Simpan token ke context
      if (data?.access_token) {
        login(data.access_token);
      }

      // Jika login sukses → redirect ke profile
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
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
          <h1 className="text-2xl font-bold mb-6">Login</h1>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            {/* Email */}
            <div className="relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Username/Email"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1c2a33] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4599DB]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1c2a33] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4599DB]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold shadow-lg disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-300 mt-6">
            No account?{" "}
            <Link href="/register" className="text-yellow-400 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
