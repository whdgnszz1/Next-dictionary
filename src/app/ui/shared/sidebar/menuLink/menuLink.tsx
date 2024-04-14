"use client";

import React from "react";
import styles from "./menuLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

function MenuLink({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  return (
    <Link
      href={item.path}
      className={`
          ${styles.container} 
          ${pathname === item.path && styles.active}
        `}
    >
      {item.icon}
      <span>{item.title}</span>
    </Link>
  );
}

export default MenuLink;
