"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BackNavProps {
  href?: string;
}

export default function BackNav({ href = "/" }: BackNavProps): JSX.Element {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Link href={href} className="flex items-center ">
        <ChevronLeft className="w-5 h-5" />
        <span className="ml-1">Back</span>
      </Link>
    </div>
  );
}
