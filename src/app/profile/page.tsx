"use client";

import { useEffect, useState } from "react";
import BackNav from "../components/BackNav";
import Image from "next/image";
import CoverProfile from "../components/CoverProfile";
import { useAuth } from "../hooks/useAuth";
import { PencilLine } from "lucide-react";
import AboutSection from "../components/AboutSection";
import Link from "next/link";
import InterestSection from "../components/Interest";

interface Profile {
  email: string;
  username: string;
  interests?: string[];
  avatar?: string | undefined;
  about?: string | undefined;
}

export default function ProfilePage(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [editInterest, setEditInterest] = useState<boolean>(false);
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
      <div className="flex items-center justify-center min-h-screen flex-col">
        <p>Profile not found</p>
        <p className="mt-4 text-center text-gray-300">
          Have an account?{" "}
          <Link href="/login" className="text-cyan-400 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-2">
      {editInterest ? (
        <InterestSection
          editInterest={editInterest}
          setEditInterest={setEditInterest}
        />
      ) : (
        <>
          <BackNav href="/" />
          <CoverProfile />
          <AboutSection />
          <InterestSection
            editInterest={editInterest}
            setEditInterest={setEditInterest}
          />
        </>
      )}
    </div>
  );
}
