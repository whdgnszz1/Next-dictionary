"use client";

import React, { useState } from "react";
import { Modal, Table } from "antd";
import { RcFile } from "antd/es/upload";
import { useGetNounList, useDeleteNoun, DeleteNounDto } from "@/lib/noun";
import Header from "./_component/Header";
import { getColumns } from "./columns";

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

  const deleteMutation = useDeleteNoun();

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

  const columns = getColumns(handleDelete);

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
