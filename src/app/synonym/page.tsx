"use client";

import { useGetSynonymList } from "@/lib/synonym/hooks/useGetSynonymList";
import { useDeleteSynonym } from "@/lib/synonym/hooks/useDeleteSynonym";
import { DeleteSynonymDto, SynonymType } from "@/lib/synonym";
import Table, { ColumnsType } from "antd/es/table";
import { Button, Modal } from "antd";
import { useState } from "react";
import { RcFile } from "antd/es/upload";
import SynonymPageHeader from "./_component/Header";

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
  const synonymList = data?.data.items;
  const totalCount = data?.data.totalCount ?? 0;

  const deleteMutation = useDeleteSynonym({
    onSuccess: () => {
      console.log("사용자 사전이 성공적으로 삭제되었습니다.");
    },
    onError: (error: unknown) => {
      console.error("Error deleting noun:", error);
    },
  });

  const handleDelete = (synonymId: number) => {
    Modal.confirm({
      title: "정말로 삭제하시겠습니까?",
      okText: "예",
      cancelText: "아니오",
      onOk() {
        const deleteNounDto: DeleteSynonymDto = { id: synonymId };
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
      dataIndex: "srchSynKeyword",
      key: "srchSynKeyword",
      align: "center",
    },
    {
      title: "유의어",
      dataIndex: "srchSynTerm",
      key: "srchSynTerm",
      align: "center",
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: SynonymType, b: SynonymType) =>
        new Date(a.cretDttm).getTime() - new Date(b.cretDttm).getTime(),
      render: (text: string) => text?.toString().slice(4, 16),
      align: "center",
    },
    {
      title: "관리",
      key: "action",
      align: "center",
      render: (_: any, record: SynonymType) => (
        <div className="flex gap-2 justify-center items-center">
          <Button
            onClick={() => handleDelete(record.srchSynId)}
            type="primary"
            danger
          >
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-5 w-1/2">
      <SynonymPageHeader fileList={fileList} updateFileList={setFileList} />
      <Table
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={synonymList}
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

export default SynonymPage;
