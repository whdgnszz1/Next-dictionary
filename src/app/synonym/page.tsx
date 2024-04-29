"use client";

import Search from "@/app/ui/shared/search/search";
import Pagination from "@/app/ui/shared/pagination/pagination";
import styles from "@/app/ui/synonym/synonym.module.css";
import Link from "next/link";

import { useGetSynonymList } from "@/lib/synonym/hooks/useGetSynonymList";
import { useDeleteSynonym } from "@/lib/synonym/hooks/useDeleteSynonym";
import { SynonymType } from "@/lib/synonym";
import { ColumnsType } from "antd/es/table";
import { Modal } from "antd";
import { useState } from "react";
import { RcFile } from "antd/es/upload";

type SynonymPageProps = {
  searchParams: {
    q?: string;
    page?: string;
  };
};

const SynonymPage = ({ searchParams }: SynonymPageProps) => {
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";

  const { data, isLoading } = useGetSynonymList({
    q,
    page: parseInt(page),
  });
  const nounList = data?.data.items;
  const totalCount = data?.data.totalCount ?? 0;

  const deleteMutation = useDeleteSynonym({
    onSuccess: () => {
      console.log("사용자 사전이 성공적으로 삭제되었습니다.");
    },
    onError: (error: unknown) => {
      console.error("Error deleting noun:", error);
    },
  });

  const handleDelete = (nounId: number) => {
    Modal.confirm({
      title: "정말로 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk() {
        const deleteNounDto: DeleteNounDto = { id: nounId };
        deleteMutation.mutate(deleteNounDto);
      },
    });
  };
  const onSelectionChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectionChange,
  };

  const columns: ColumnsType<SynonymType> = [
    {
      title: "키워드",
      dataIndex: "term",
      key: "term",
      sorter: (a: SynonymType, b: SynonymType) => a.term.localeCompare(b.term),
      align: "center",
    },
    {
      title: "수정일",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: SynonymType, b: SynonymType) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text: string) => text?.toString().slice(4, 16),
      align: "center",
    },
    {
      title: "관리",
      key: "action",
      align: "center",
      render: (_: any, record: NounType) => (
        <div className="flex gap-2 justify-center items-center">
          <Link href={`/noun/${record.id}`}>
            <PrimaryButton text="수정" />
          </Link>
          <Button onClick={() => handleDelete(record.id)} type="primary" danger>
            삭제
          </Button>
        </div>
      ),
    },
  ];

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
