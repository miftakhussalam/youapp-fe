"use client";

import Link from "next/link";
import BottomNav from "./components/BottomNav";

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col flex-1 w-full min-h-screen">
      <div className="flex-1 p-6 flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
        <p className="text-gray-600 mb-6">Your App</p>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-2 rounded-lg text-white font-semibold"
            style={{
              background:
                "linear-gradient(108.32deg, #62CDCB 24.88%, #4599DB 78.49%)",
            }}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 rounded-lg text-white font-semibold border border-gray-500"
          >
            Register
          </Link>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
