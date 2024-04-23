"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Table } from "antd";
import { RcFile } from "antd/es/upload";
import {
  useGetNounList,
  useDeleteNoun,
  DeleteNounDto,
  NounType,
} from "@/lib/noun";
import Header from "../ui/shared/header/header";
import { ColumnsType } from "antd/es/table";

type NounPageProps = {
  searchParams: {
    q?: string;
    page?: string;
  };
};

const NounPage = ({ searchParams }: NounPageProps) => {
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

  const onSelectionChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectionChange,
  };

  const columns: ColumnsType<NounType> = [
    {
      title: "키워드",
      dataIndex: "term",
      key: "term",
      sorter: (a: NounType, b: NounType) => a.term.localeCompare(b.term),
      align: "center",
    },
    {
      title: "수정일",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: NounType, b: NounType) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text: string) => text?.toString().slice(4, 16),
      align: "center",
    },
    {
      title: "관리",
      key: "action",
      align: "center",
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
    <div className="mt-5 w-1/2">
      <Header fileList={fileList} updateFileList={setFileList} />
      <Table
        rowSelection={rowSelection}
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
