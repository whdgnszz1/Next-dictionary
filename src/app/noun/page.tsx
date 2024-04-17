"use client";

import Search from "@/app/ui/shared/search/search";
import Pagination from "@/app/ui/shared/pagination/pagination";
import styles from "@/app/ui/noun/noun.module.css";
import Link from "next/link";
import { useGetNounList } from "@/lib/noun/hooks/useGetNounList";
import { useDeleteNoun } from "@/lib/noun/hooks/useDeleteNoun";
import { useState } from "react";

const NounPage = () => {
  const { data } = useGetNounList();
  const nouns = data?.data;
  const count = nouns?.length ?? 0;

  const [deletingNounId, setDeletingNounId] = useState<number | null>(null);

  const deleteMutation = useDeleteNoun(deletingNounId as number, {
    onSuccess: () => {
      console.log("사용자 사전이 성공적으로 삭제되었습니다.");
      setDeletingNounId(null);
    },
    onError: (error) => {
      console.error("Error deleting noun:", error);
      setDeletingNounId(null);
    },
  });

  const handleDelete = (nounId: number) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      if (nounId !== null) {
        setDeletingNounId(nounId);
        deleteMutation.mutate(nounId);
      }
    }
  };

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
              {nouns.map((noun) => (
                <tr key={noun.nounId}>
                  <td>
                    <div>{noun.content}</div>
                  </td>
                  <td>{noun.isActive ? "예" : "-"}</td>
                  <td>{noun.createdAt?.toString().slice(4, 16)}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/noun/${noun.nounId}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          수정
                        </button>
                      </Link>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.delete}`}
                        onClick={() => handleDelete(noun.nounId)}
                      >
                        삭제
                      </button>
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
