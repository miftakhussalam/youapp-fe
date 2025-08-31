"use client";
import { useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function CoverProfile() {
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
    <div className="relative">
        <Image
          src="/profile-bg.jpg"
          alt="cover"
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-2 left-4">
          <div className="font-semibold">@johndoe, 28</div>
          <div className="text-sm text-gray-400">Male</div>
          <div className="flex gap-2 mt-1 text-xs">
            <span className="px-2 py-1 bg-gray-800 rounded">♍ Virgo</span>
            <span className="px-2 py-1 bg-gray-800 rounded">🐷 Pig</span>
          </div>
        </div>
      </div>
  );
}
