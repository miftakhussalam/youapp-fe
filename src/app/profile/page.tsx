"use client";

import { useEffect, useState } from "react";
import BackNav from "../components/BackNav";
import Image from "next/image";
import CoverProfile from "../components/CoverProfile";
import { useAuth } from "../hooks/useAuth";
import { PencilLine } from "lucide-react";
import AboutSection from "../components/AboutSection";

interface Profile {
  email: string;
  username: string;
  interests?: string[];
  avatar?: string | undefined;
  about?: string | undefined;
}

export default function ProfilePage(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const { token, setUser, user } = useAuth();

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        // kalau context kosong, fallback ke localStorage
        const jwtToken = token ?? localStorage.getItem("authToken");

        if (!jwtToken) {
          console.error("No token found, redirecting to login...");
          window.location.href = "/login"; // redirect kalau belum login
          return;
        }
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

        const res: Response = await fetch(`${BASE_URL}/api/getProfile`, {
          method: "GET",
          headers: {
            "x-access-token": jwtToken,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const result = await res.json();

        console.log("res", result);
        setUser(result.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Profile not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-2">
      {/* Back Navigation */}
      <BackNav href="/" />

      {/* Profile Section */}
      <CoverProfile />

      {/* About Section */}
      {/* <div className="mt-8 bg-[#0E191F] rounded-md p-2 relative">
        <div className="absolute top-3 right-4">
          <PencilLine size={20} />
        </div>
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-gray-600">
          {user?.about ?? "Add in your bio to help others know you better"}
        </p>
      </div> */}

      <AboutSection />

      {/* Interests Section */}
      <div className="mt-8 bg-[#0E191F] rounded-md p-2">
        <h2 className="text-lg font-semibold mb-2">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {(user.interests && user.interests.length > 0
            ? user.interests
            : []
          ).map((interest: string) => (
            <span
              key={interest}
              className="px-3 py-1 bg-[#162329] rounded-full text-sm text-white"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
