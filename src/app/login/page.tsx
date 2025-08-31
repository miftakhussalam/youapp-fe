"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import BackNav from "../components/BackNav";
import Link from "next/link";

export default function LoginPage(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

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

          <form className="flex flex-col gap-4">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Johndoe@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-[#1c2a33] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4599DB]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold shadow-lg"
              style={{
                background:
                  "linear-gradient(108.32deg, #62CDCB 24.88%, #4599DB 78.49%)",
              }}
            >
              Login
            </button>
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
