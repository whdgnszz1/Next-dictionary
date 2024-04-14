"use client";

import Search from "@/app/ui/shared/search/search";
import Pagination from "@/app/ui/shared/pagination/pagination";
import styles from "@/app/ui/noun/noun.module.css";

import Link from "next/link";
import { Noun } from "@/model/noun";
import { useGetNounList } from "@/lib/noun/hooks/useGetNounList";

type Props = {
  searchParams: {
    q?: string;
    page?: number;
  };
};

const NounPage = () => {
  const { data, isLoading, isError, error } = useGetNounList();

  const nouns = data?.data;
  const count = nouns?.length ?? 0;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="키워드 검색" />
        <Link href="/noun/add">
          <button className={styles.addButton}>추가하기</button>
        </Link>
      </div>
      {nouns && nouns.length > 0 && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <td className={styles.keywordColumn}>키워드</td>
                <td className={styles.applyColumn}>적용</td>
                <td className={styles.dateColumn}>수정일</td>
                <td className={styles.managementColumn}>관리</td>
              </tr>
            </thead>
            <tbody>
              {nouns.map((noun: Noun) => (
                <tr key={noun.id}>
                  <td>
                    <div>{noun.content}</div>
                  </td>
                  <td>{noun.isActive ? "예" : "-"}</td>
                  <td>{noun.createdAt?.toString().slice(4, 16)}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/noun/${noun.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          수정
                        </button>
                      </Link>
                      <form action="">
                        <input type="hidden" name="id" value={noun.id} />
                        <button className={`${styles.button} ${styles.delete}`}>
                          삭제
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination count={count} />
        </>
      )}
    </div>
  );
};

export default NounPage;
