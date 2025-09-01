"use client";

import { ChevronLeft, PencilLine, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

interface InterestSectionProps {
  editInterest: boolean;
  setEditInterest: (edit: boolean) => void;
}

export default function InterestSection({
  editInterest,
  setEditInterest,
}: InterestSectionProps) {
  const { user, setUser } = useAuth();
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [inputValue, setInputValue] = useState("");
  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const addInterest = (value: string) => {
    if (value.trim() && !interests.includes(value.trim())) {
      setInterests([...interests, value.trim()]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInterest(inputValue);
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue) {
      // remove last chip when backspace on empty input
      removeInterest(interests[interests.length - 1]);
    }
  };

  const handleUpdate = async (): Promise<void> => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

      const res: Response = await fetch(`${BASE_URL}/api/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, interests }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update profile: ${res.statusText}`);
      }

      // Adjust type according to your API response shape
      const data: { success: boolean; message?: string } = await res.json();
      console.log("Profile updated:", data);

      user && setUser({ ...user, interests });
      setEditInterest(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating profile:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  if (editInterest) {
    return (
      <div className="relative">
        <div className="flex justify-between items-center mt-6 mx-2 absolute top-0 left-0 right-0 ">
          <button
            onClick={() => setEditInterest(!editInterest)}
            className="flex items-center text-white hover:text-gray-300"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="ml-1">Back</span>
          </button>
          <button
            onClick={handleUpdate}
            className="flex items-center text-white"
          >
            <span
              className="ml-1 font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(134.86deg, #ABFFFD 2.64%, #4599DB 102.4%, #AADAFF 102.4%)",
              }}
            >
              Save
            </span>
          </button>
        </div>
        <div className="flex items-center justify-center h-screen flex-col w-full">
          <div
            className="text-sm font-medium bg-gradient-to-r from-[#94783E] via-[#F3EDA6] via-30% via-[#FFE2BE] via-50% via-[#D5BE88] to-[#D5BE88] bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)",
            }}
          >
            Tell everyone about yourself
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            What interests you?
          </div>

          <div className="mt-8 bg-[#0E191F] rounded-2xl p-4 w-full max-w-lg">
            <div className="flex flex-wrap gap-2 items-center">
              {interests.map((interest) => (
                <div
                  key={interest}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-semibold text-white"
                >
                  {interest}
                  <button
                    onClick={() => removeInterest(interest)}
                    className="hover:text-red-400 flex items-center"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>
                </div>
              ))}

              {/* Input field like YouTube tags */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add interest"
                className="bg-transparent text-white placeholder-gray-500 focus:outline-none px-2 py-1"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-[#0E191F] rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Interest</h2>
        <button onClick={() => setEditInterest(!editInterest)}>
          <PencilLine className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {interests.length > 0 ? (
          interests.map((interest) => (
            <span
              key={interest}
              className="flex items-center gap-2 px-3 py-1 bg-[#162329] rounded-full text-sm text-white"
            >
              {interest}
              {editInterest && (
                <button
                  onClick={() => removeInterest(interest)}
                  className="hover:text-red-400"
                >
                  <X size={14} />
                </button>
              )}
            </span>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No interests yet</p>
        )}
      </div>
    </div>
  );
}
