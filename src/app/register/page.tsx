"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import BackNav from "../components/BackNav";
import Link from "next/link";

export default function RegisterPage(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

          <form className="flex flex-col gap-4">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="johndoe123"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold mt-2"
              style={{
                background:
                  "linear-gradient(108.32deg, #62CDCB 24.88%, #4599DB 78.49%)",
              }}
            >
              Register
            </button>
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
