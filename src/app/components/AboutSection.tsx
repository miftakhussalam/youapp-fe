"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

export default function AboutSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "John Doe",
    gender: "Male",
    birthday: "01 Jan 1990",
    horoscope: "Capricorn",
    zodiac: "Tiger",
    height: "175 cm",
    weight: "70 kg",
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
    <div className="bg-gray-900 text-white rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">About</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>
            <Pencil className="w-5 h-5 text-gray-400 hover:text-white" />
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
            {formData.displayName}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {formData.gender}
          </p>
          <p>
            <span className="font-medium">Birthday:</span> {formData.birthday}
          </p>
          <p>
            <span className="font-medium">Horoscope:</span> {formData.horoscope}
          </p>
          <p>
            <span className="font-medium">Zodiac:</span> {formData.zodiac}
          </p>
          <p>
            <span className="font-medium">Height:</span> {formData.height}
          </p>
          <p>
            <span className="font-medium">Weight:</span> {formData.weight}
          </p>
        </div>
      ) : (
        /* Mode Edit */
        <form className="space-y-3">
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
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
