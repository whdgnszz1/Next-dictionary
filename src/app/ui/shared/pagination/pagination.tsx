"use client";

import { ITEM_PER_PAGE } from "@/lib/const";
import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  count: number;
}

const Pagination = ({ count }: PaginationProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  let page = parseInt(searchParams.get("page") || "1", 10);

  const params = new URLSearchParams(searchParams);
  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const handleChangePage = (type: "prev" | "next") => {
    type === "prev"
      ? params.set("page", String(page - 1))
      : params.set("page", String(page + 1));
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        이전 페이지
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        다음 페이지
      </button>
    </div>
  );
};

export default Pagination;
