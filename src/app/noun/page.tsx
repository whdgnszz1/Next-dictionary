"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useGetNounList,
  useDeleteNoun,
  DeleteNounDto,
  NounType,
} from "@/lib/noun";
import Header from "../ui/shared/header/header";
import { RcFile } from "antd/es/upload";
import { Button, Table } from "antd";

type NounPageProps = {
  searchParams: {
    q?: string;
    page?: string;
  };
};

const NounPage = ({ searchParams }: NounPageProps) => {
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";

  const { data, isLoading } = useGetNounList({
    q,
    page: parseInt(page),
  });
  const nounList = data?.data.items;
  const totalCount = data?.data.totalCount ?? 0;

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
      const deleteNounDto: DeleteNounDto = { id: nounId };
      deleteMutation.mutate(deleteNounDto);
    }
  };

  const columns = [
    {
      title: "키워드",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "수정일",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => text?.toString().slice(4, 16),
    },
    {
      title: "관리",
      key: "action",
      render: (_: any, record: NounType) => (
        <div>
          <Link href={`/noun/${record.id}`}>
            <Button type="link">수정</Button>
          </Link>
          <Button onClick={() => handleDelete(record.id)} type="link">
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5 rounded-xl mt-5">
      <Header fileList={fileList} updateFileList={setFileList} />
      <Table
        columns={columns}
        dataSource={nounList}
        rowKey="id"
        loading={isLoading}
        pagination={{
          total: totalCount,
          pageSize: 10,
          current: parseInt(page),
        }}
      />
    </div>
  );
};

export default NounPage;
