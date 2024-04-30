"use client";

import Search from "@/app/ui/shared/search/Search";
import styles from "@/app/ui/stop/stop.module.css";
import Link from "next/link";
import { DeleteStopDto, useDeleteStop, useGetStopList } from "@/lib/stop";

const StopPage = () => {
  const { data } = useGetStopList();
  const stopList = data?.data;
  const count = stopList?.length ?? 0;

  const deleteMutation = useDeleteStop({
    onSuccess: () => {
      console.log("노출 금지 사전이 성공적으로 삭제되었습니다.");
    },
    onError: (error: unknown) => {
      console.error("Error deleting stop:", error);
    },
  });

  const handleDelete = (stopId: number) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      if (stopId !== null) {
        const deleteStopDto: DeleteStopDto = {
          id: stopId,
        };
        deleteMutation.mutate(deleteStopDto);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="키워드 검색" />
        <Link href="/stop/add">
          <button className={styles.addButton}>추가하기</button>
        </Link>
      </div>
      {stopList && stopList.length > 0 && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <td className={styles.keywordColumn}>키워드</td>
                <td className={styles.dateColumn}>수정일</td>
                <td className={styles.managementColumn}>관리</td>
              </tr>
            </thead>
            <tbody>
              {stopList.map((stop) => (
                <tr key={stop.id}>
                  <td>
                    <div>{stop.content}</div>
                  </td>
                  <td>{stop.createdAt?.toString().slice(4, 16)}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/stop/${stop.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          수정
                        </button>
                      </Link>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.delete}`}
                        onClick={() => handleDelete(stop.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StopPage;
