"use client";

import { usePathname } from "next/navigation";
import React from "react";
import styles from "./navbar.module.css";

function Navbar() {
  const pathname = usePathname();
  let pageTitle = "";
  const pathSegments = pathname.split("/");

  if (pathSegments.includes("noun")) {
    pageTitle = "사용자 사전";
  } else if (pathSegments.includes("synonym")) {
    pageTitle = "동의어 사전";
  } else if (pathSegments.includes("stop")) {
    pageTitle = "노출 금지 사전";
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pageTitle}</div>
    </div>
  );
}

export default Navbar;
