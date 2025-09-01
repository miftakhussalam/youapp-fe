"use client";

import { useState } from "react";
import { PencilLine } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function AboutSection() {
    const { user } = useAuth();
  
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

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated data:", formData);
    // TODO: Simpan ke API / database
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
            className="text-sm font-semibold text-yellow-400 hover:underline"
          >
            Save & Update
          </button>
        )}
      </div>

      {/* Mode Tampilan */}
      {!isEditing ? (
        <div className="space-y-2 text-gray-300">
          <p>
            <span className="font-medium">Display name:</span>{" "}
            {user?.username}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {user?.gender || 'Male'}
          </p>
          <p>
            <span className="font-medium">Birthday:</span> {user?.birthday}
          </p>
          <p>
            <span className="font-medium">Horoscope:</span> {user?.horoscope}
          </p>
          <p>
            <span className="font-medium">Zodiac:</span> {user?.zodiac}
          </p>
          <p>
            <span className="font-medium">Height:</span> {user?.height} cm
          </p>
          <p>
            <span className="font-medium">Weight:</span> {user?.weight} kg
          </p>
        </div>
      ) : (
        /* Mode Edit */
        <form className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            placeholder="DD MM YYYY"
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Add height"
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Add weight"
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </form>
      )}
    </div>
  );
}
