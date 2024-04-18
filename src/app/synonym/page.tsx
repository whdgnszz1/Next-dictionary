"use client";

import Search from "@/app/ui/shared/search/search";
import Pagination from "@/app/ui/shared/pagination/pagination";
import styles from "@/app/ui/synonym/synonym.module.css";
import Link from "next/link";

import { useGetSynonymList } from "@/lib/synonym/hooks/useGetSynonymList";
import { useDeleteSynonym } from "@/lib/synonym/hooks/useDeleteSynonym";
import { DeleteSynonymDto } from "@/lib/synonym";

const SynonymPage = () => {
  const { data } = useGetSynonymList();
  const synonymList = data?.data;
  const count = synonymList?.length ?? 0;

  const deleteMutation = useDeleteSynonym({
    onSuccess: () => {
      console.log("동의어 사전이 성공적으로 삭제되었습니다.");
    },
    onError: (error: unknown) => {
      console.error("Error deleting synonym:", error);
    },
  });

  const handleDelete = (synonymId: number) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      if (synonymId !== null) {
        const deleteSynonymDto: DeleteSynonymDto = {
          id: synonymId,
        };
        deleteMutation.mutate(deleteSynonymDto);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="키워드 검색" />
        <Link href="/synonym/add">
          <button className={styles.addButton}>추가하기</button>
        </Link>
      </div>
      {synonymList && synonymList.length > 0 && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <td className={styles.keywordColumn}>키워드</td>
                <td className={styles.applyColumn}>적용</td>
                <td className={styles.applyColumn}>단방향 / 양방향</td>
                <td className={styles.dateColumn}>수정일</td>
                <td className={styles.managementColumn}>관리</td>
              </tr>
            </thead>
            <tbody>
              {synonymList.map((synonym) => (
                <tr key={synonym.id}>
                  <td>
                    <div>{synonym.content}</div>
                  </td>
                  <td>{synonym.isActive === "1" ? "예" : "-"}</td>
                  <td>{synonym.isOneWay === "1" ? "단방향" : "양방향"}</td>
                  <td>{synonym.createdAt?.toString().slice(4, 16)}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/synonym/${synonym.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          수정
                        </button>
                      </Link>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.delete}`}
                        onClick={() => handleDelete(synonym.id)}
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

export default SynonymPage;
