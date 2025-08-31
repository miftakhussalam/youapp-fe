"use client";

import BackNav from "../components/BackNav";
import Image from "next/image";
import CoverProfile from "../components/CoverProfile";

export default function ProfilePage(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen p-6">
      {/* Back Navigation */}
      <BackNav href="/" />

      {/* Profile Section */}
      <CoverProfile />

      {/* About Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-gray-600">
          Add in your your to help others know you better
        </p>
      </div>

      {/* Interests Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {["Coding", "Gaming", "Music", "Travel", "Photography"].map(
            (interest) => (
              <span
                key={interest}
                className="px-3 py-1 rounded-full text-sm text-white"
                style={{
                  background:
                    "linear-gradient(108.32deg, #62CDCB 24.88%, #4599DB 78.49%)",
                }}
              >
                {interest}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
