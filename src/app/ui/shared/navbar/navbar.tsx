"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { title: "검색결과 비교", path: "/compare", borderStyle: "border-x-[2px]" },
    { title: "검색어 분석", path: "/analyze", borderStyle: "border-r-[2px]" },
    { title: "사용자 사전", path: "/noun", borderStyle: "border-r-[2px]" },
    { title: "유의어 사전", path: "/synonym", borderStyle: "border-r-[2px]" },
  ];

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <div className="flex items-center text-black h-[48px] border-b-[2px] border-black">
        <Image
          className="px-2"
          src="/nav_logo.png"
          alt="Navigation Logo"
          width={100}
          height={40}
        />
        {menuItems.map((item) => (
          <div
            key={item.title}
            className={`flex items-center justify-center h-full ${
              item.borderStyle
            } border-t-[2px] px-6 font-bold border-black cursor-pointer ${
              pathname.includes(item.path.substring(1))
                ? "bg-[#374484] text-white"
                : "bg-white text-black"
            }`}
            onClick={() => navigateTo(item.path)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
