"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import { RcFile } from "antd/es/upload";

import Search from "@/app/ui/shared/search/search";
import BulkUploadModal from "@/app/noun/_component/BulkUploadModal";

interface HeaderProps {
  fileList: RcFile[];
  updateFileList: (updateFn: (fileList: RcFile[]) => RcFile[]) => void;
}

function Header({ fileList, updateFileList }: HeaderProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => setIsModalVisible(false);

  return (
    <div className="flex items-center justify-between py-2">
      <Search placeholder="키워드 검색" />
      <div className="flex gap-2">
        <Link href="/noun/add">
          <Button type="primary">추가</Button>
        </Link>
        <Button onClick={showModal} type="primary">
          일괄 사용자 사전 등록
        </Button>
        <BulkUploadModal
          isVisible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          fileList={fileList}
          updateFileList={updateFileList}
          target="noun"
        />
      </div>
    </div>
  );
}

export default Header;
