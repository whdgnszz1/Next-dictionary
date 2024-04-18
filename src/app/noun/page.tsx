"use client";

import Search from "@/app/ui/shared/search/search";
import Pagination from "@/app/ui/shared/pagination/pagination";
import styles from "@/app/ui/noun/noun.module.css";
import Link from "next/link";
import { useGetNounList, useDeleteNoun, DeleteNounDto } from "@/lib/noun";

const NounPage = () => {
  const { data } = useGetNounList();
  const nounList = data?.data;
  const count = nounList?.length ?? 0;

  const deleteMutation = useDeleteNoun({
    onSuccess: () => {
      console.log("사용자 사전이 성공적으로 삭제되었습니다.");
    },
    onError: (error: unknown) => {
      console.error("Error deleting noun:", error);
    },
  });

  const handleDelete = (nounId: number) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      if (nounId !== null) {
        const deleteNounDto: DeleteNounDto = {
          id: nounId,
        };
        deleteMutation.mutate(deleteNounDto);
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
      {nounList && nounList.length > 0 && (
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
              {nounList.map((noun) => (
                <tr key={noun.id}>
                  <td>
                    <div>{noun.content}</div>
                  </td>
                  <td>{noun.isActive === "1" ? "예" : "-"}</td>
                  <td>{noun.createdAt?.toString().slice(4, 16)}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/noun/${noun.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          수정
                        </button>
                      </Link>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.delete}`}
                        onClick={() => handleDelete(noun.id)}
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
