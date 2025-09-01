"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface BackNavProps {
  href?: string;
}

export default function BackNav({ href }: BackNavProps): JSX.Element {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center gap-2 my-6 sticky top-0">
      <button
        onClick={handleBack}
        className="flex items-center text-white hover:text-gray-300"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="ml-1">Back</span>
      </button>
    </div>
  );
}
