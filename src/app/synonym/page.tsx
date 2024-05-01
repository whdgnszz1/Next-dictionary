"use client";

import { useState } from "react";
import {
  useGetSynonymList,
  useDeleteSynonym,
  DeleteSynonymDto,
  SynonymType,
} from "@/lib/synonym";

import Table, { ColumnsType } from "antd/es/table";
import { Button, Modal } from "antd";
import { RcFile } from "antd/es/upload";

import SynonymPageHeader from "./_component/Header";
import SingleUploadModal from "./_component/SingleUploadModal";

import { compareDates } from "@/shared/utils";

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

  const deleteMutation = useDeleteSynonym({
    onSuccess: () => {
      console.log("유의어 사전이 성공적으로 삭제되었습니다.");
    },
    onError: (error: unknown) => {
      console.error("Error deleting synonym:", error);
    },
  });

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
      dataIndex: "cretDttm",
      key: "cretDttm",
      sorter: (a: SynonymType, b: SynonymType) =>
        compareDates(a.cretDttm, b.cretDttm),
      render: (cretDttm: string) => cretDttm?.split("T")[0],
      align: "center",
    },
    {
      title: "수정일",
      dataIndex: "amndDttm",
      key: "amndDttm",
      sorter: (a: SynonymType, b: SynonymType) =>
        compareDates(a.amndDttm, b.amndDttm),
      render: (amndDttm: string) => amndDttm?.split("T")[0],
      align: "center",
    },
    {
      title: "관리",
      key: "action",
      align: "center",
      render: (_, record: SynonymType) => (
        <div className="flex gap-2 justify-center items-center">
          <Button onClick={() => handleEdit(record)} type="primary">
            수정
          </Button>
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
