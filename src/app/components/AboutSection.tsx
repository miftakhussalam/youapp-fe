"use client";

import { useState } from "react";
import { PencilLine } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function AboutSection() {
  const { user, setUser, token } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    gender: user?.gender || "Male",
    birthday: user?.birthday || "01 Jan 1990",
    horoscope: user?.horoscope || "Capricorn",
    zodiac: user?.zodiac || "Tiger",
    height: user?.height || 170,
    weight: user?.weight || 70,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (): Promise<void> => {
    try {
      const jwtToken = token ?? localStorage.getItem("authToken");

      if (!jwtToken) {
        console.error("No token found, redirecting to login...");
        window.location.href = "/login"; // redirect kalau belum login
        return;
      }
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

      const res: Response = await fetch(`${BASE_URL}/api/updateProfile`, {
        method: "PUT",
        headers: {
          "x-access-token": jwtToken,
        },
        body: JSON.stringify({ ...user, ...formData }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update profile: ${res.statusText}`);
      }

      // Adjust type according to your API response shape
      const data: { success: boolean; message?: string } = await res.json();
      console.log("Profile updated:", data);

      user && setUser({ ...user, ...formData });
      setIsEditing(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating profile:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="bg-[#0E191F] rounded-md mt-8 p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">About</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>
            <PencilLine className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="text-sm font-semibold text-yellow-400 hover:underline from-[#94783E] via-[#F3EDA6] via-30% via-[#FFE2BE] via-50% via-[#D5BE88] to-[#D5BE88] bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)",
            }}
          >
            Save & Update
          </button>
        )}
      </div>

      {/* Mode Tampilan */}
      {!isEditing ? (
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="font-medium text-gray-500">Display name:</span> {user?.name}
          </p>
          <p>
            <span className="font-medium text-gray-500">Gender:</span>{" "}
            {user?.gender || "Male"}
          </p>
          <p>
            <span className="font-medium text-gray-500">Birthday:</span> {user?.birthday}
          </p>
          <p>
            <span className="font-medium text-gray-500">Horoscope:</span> {user?.horoscope}
          </p>
          <p>
            <span className="font-medium text-gray-500">Zodiac:</span> {user?.zodiac}
          </p>
          <p>
            <span className="font-medium text-gray-500">Height:</span> {user?.height} cm
          </p>
          <p>
            <span className="font-medium text-gray-500">Weight:</span> {user?.weight} kg
          </p>
        </div>
      ) : (
        /* Mode Edit */
        <form className="space-y-3">
          <div className="flex items-center gap-4">
            <label htmlFor="name" className="flex-1">
              Display Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="flex-1 px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 w-1/3"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="gender" className="flex-1">
              Gender:
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="flex-1 w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="birthday" className="flex-1">
              Birthday:
            </label>
            <input
              type="text"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              placeholder="DD MM YYYY"
              className=" flex-1 w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="height" className="flex-1">
              Height:
            </label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Add height"
              className="flex-1 w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="weight" className="flex-1">
              Weight:
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Add weight"
              className="flex-1 w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
            />
          </div>
        </form>
      )}
    </div>
  );
}
