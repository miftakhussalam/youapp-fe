"use client";
import Image from "next/image";
import { useAuth } from "../hooks/useAuth";
import { PencilLine } from "lucide-react";
import { useRef, useState } from "react";

export default function CoverProfile() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [cover, setCover] = useState("/profile-bg.jpg"); // default cover

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCover(previewUrl);

      // TODO: upload logic ke server
      console.log("Selected file:", file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative bg-[#162329] rounded-md">
      <Image
        src={cover}
        alt="cover"
        width={400}
        height={200}
        className="w-full h-40 object-cover rounded-md"
      />

      {/* Button upload */}
      <div
        onClick={handleClick}
        className="absolute top-3 right-4 p-2"
      >
        <PencilLine size={20} className="text-white" />
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div className="absolute bottom-2 left-4">
        <div className="font-semibold">
          @{user?.username}, {9}
        </div>
        <div className="text-sm text-gray-400">{"male"}</div>
        <div className="flex gap-2 mt-1 text-xs">
          {user?.zodiac && (
            <span className="px-2 py-1 bg-gray-800 rounded">
              {user.zodiac}
            </span>
          )}
          {user?.horoscope && (
            <span className="px-2 py-1 bg-gray-800 rounded">
              {user.horoscope}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
