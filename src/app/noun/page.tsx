"use client";

import React, { useState } from "react";
import { Button, Modal, Table } from "antd";
import { RcFile } from "antd/es/upload";
import {
  useGetNounList,
  useDeleteNoun,
  DeleteNounDto,
  NounType,
} from "@/lib/noun";
import Header from "./_component/Header";
import { ColumnsType } from "antd/es/table";
import { compareDates } from "@/shared/utils";
import toast from "react-hot-toast";

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
      toast.success(`사용자 사전이 성공적으로 삭제되었습니다.`);
    },
    onError: (error: unknown) => {
      toast.error(`사용자 사전 삭제 중 오류가 발생했습니다. \n ${error}`);
      console.error("Error deleting Noun:", error);
    },
  });

  const handleDelete = (srchNounId: number) => {
    Modal.confirm({
      title: "정말로 삭제하시겠습니까?",
      okText: "예",
      okType: "danger",
      cancelText: "아니오",
      onOk() {
        const deleteNounDto: DeleteNounDto = { srchNounId };
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

  const columns: ColumnsType<NounType> = [
    {
      title: "키워드",
      dataIndex: "srchNoun",
      key: "srchNoun",
      sorter: (a: NounType, b: NounType) =>
        a.srchNoun.localeCompare(b.srchNoun),
      align: "center",
    },
    {
      title: "생성일",
      dataIndex: "cretDttm",
      key: "cretDttm",
      sorter: (a: NounType, b: NounType) =>
        compareDates(a.cretDttm, b.cretDttm),
      render: (cretDttm: string) => cretDttm?.split("T")[0],
      align: "center",
    },
    {
      title: "관리",
      key: "action",
      align: "center",
      render: (_: any, record: NounType) => (
        <div className="flex gap-2 justify-center items-center">
          <Button
            onClick={() => handleDelete(record.srchNounId)}
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
    <div className="mt-5 w-1/2 min-w-[1000px]">
      <Header
        fileList={fileList}
        updateFileList={setFileList}
        totalCount={totalCount}
      />
      <Table
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={nounList}
        rowKey="srchNounId"
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
