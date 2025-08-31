"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ title }: { title: string }) {
  const router = useRouter();
  return (
    <header className="flex items-center gap-3 p-4 border-b">
      <button onClick={() => router.back()}>
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
