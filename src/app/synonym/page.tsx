"use client";

import { useState } from "react";
import {
  useGetSynonymList,
  useDeleteSynonym,
  DeleteSynonymDto,
  SynonymType,
} from "@/lib/synonym";

import Table from "antd/es/table";
import { Modal } from "antd";
import { RcFile } from "antd/es/upload";

import SynonymPageHeader from "./_component/Header";
import SingleUploadModal from "./_component/SingleUploadModal";

import { getColumns } from "./columns";

type SynonymPageProps = {
  searchParams: {
    q?: string;
    page?: string;
  };
};

const SynonymPage = ({ searchParams }: SynonymPageProps) => {
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSynonym, setCurrentSynonym] = useState<SynonymType | null>(
    null
  );

  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";

  const { data, isLoading } = useGetSynonymList({
    q,
    page: parseInt(page),
  });
  const synonymList = data?.data.items;
  const totalCount = data?.data.totalCount ?? 0;

  const deleteMutation = useDeleteSynonym();

  const handleEdit = (record: SynonymType) => {
    setCurrentSynonym(record);
    setIsModalVisible(true);
  };

  const handleDelete = (srchSynId: number) => {
    Modal.confirm({
      title: "정말로 삭제하시겠습니까?",
      okText: "예",
      cancelText: "아니오",
      onOk() {
        const deleteSynonymDto: DeleteSynonymDto = { srchSynId };
        deleteMutation.mutate(deleteSynonymDto);
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

  const columns = getColumns(handleEdit, handleDelete);

  return (
    <div className="mt-5 w-1/2 min-w-[1000px]">
      <SynonymPageHeader
        fileList={fileList}
        updateFileList={setFileList}
        totalCount={totalCount}
      />
      <Table
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={synonymList}
        rowKey="srchSynId"
        loading={isLoading}
        pagination={{
          total: totalCount,
          pageSize: 10,
          current: parseInt(page),
        }}
      />
      <SingleUploadModal
        isVisible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
          setCurrentSynonym(null);
        }}
        onCancel={() => {
          setIsModalVisible(false);
          setCurrentSynonym(null);
        }}
        initialSynonym={currentSynonym}
      />
    </div>
  );
};

export default SynonymPage;
