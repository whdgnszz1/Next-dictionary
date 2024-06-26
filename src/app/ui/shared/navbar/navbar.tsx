"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BORDER, getMenuItemClass } from "./navbar.css.module";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { title: "검색결과 비교", path: "/compare" },
    { title: "검색어 분석", path: "/analyze" },
    { title: "사용자 사전", path: "/noun" },
    { title: "유의어 사전", path: "/synonym" },
  ];

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className={`flex min-w-[1000px] items-center text-black h-[48px] border-b-[2px] border-black`}
    >
      <Image
        src="/nav_logo.png"
        alt="Navigation Logo"
        width={120}
        height={40}
      />
      {menuItems.map((item) => (
        <div
          key={item.title}
          className={getMenuItemClass({
            path: item.path,
            currentPath: pathname,
          })}
          onClick={() => navigateTo(item.path)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default Navbar;
