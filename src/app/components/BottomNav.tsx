"use client";

import Link from "next/link";
import { Home, User, MessageCircle } from "lucide-react";
import React from "react";

const BottomNav: React.FC = () => {
  return (
    <nav className="flex justify-around border-t p-2 bg-[#0D1D23] text-white">
      <Link href="/" className="flex flex-col items-center">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              gradientTransform="rotate(108.32)"
            >
              <stop offset="24.88%" stopColor="#62cdcb" />
              <stop offset="78.49%" stopColor="#4599db" />
            </linearGradient>
          </defs>
          {/* clone path dari icon lucide */}
          <Home stroke="url(#gradient)" className="w-6 h-6" />
        </svg>
        <span className="text-xs text-gradient">Home</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              gradientTransform="rotate(108.32)"
            >
              <stop offset="24.88%" stopColor="#62cdcb" />
              <stop offset="78.49%" stopColor="#4599db" />
            </linearGradient>
          </defs>
          {/* clone path dari icon lucide */}
          <User stroke="url(#gradient)" className="w-6 h-6" />
        </svg>
        <span className="text-xs text-gradient">Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
