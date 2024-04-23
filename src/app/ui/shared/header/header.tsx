"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import { RcFile } from "antd/es/upload";

import Search from "@/app/ui/shared/search/search";
import BulkUploadModal from "@/app/noun/_component/BulkUploadModal";
import SingleUploadModal from "@/app/noun/_component/SingleUploadModal";

interface HeaderProps {
  fileList: RcFile[];
  updateFileList: (updateFn: (fileList: RcFile[]) => RcFile[]) => void;
}

function Header({ fileList, updateFileList }: HeaderProps) {
  const [isBulkModalVisible, setIsBulkModalVisible] = useState(false);
  const [isSingleModalVisible, setIsSingleModalVisible] = useState(false);

  const showBulkModal = () => setIsBulkModalVisible(true);
  const showSingleModal = () => setIsSingleModalVisible(true);
  const handleBulkModalOk = () => setIsBulkModalVisible(false);
  const handleBulkModalCancel = () => setIsBulkModalVisible(false);
  const handleSingleModalOk = () => setIsSingleModalVisible(false);
  const handleSingleModalCancel = () => setIsSingleModalVisible(false);

  return (
    <div className="flex items-center justify-between py-2">
      <Search placeholder="키워드 검색" />
      <div className="flex gap-2">
        <Button onClick={showSingleModal} type="primary">
          추가
        </Button>
        <Button onClick={showBulkModal} type="primary">
          일괄 사용자 사전 등록
        </Button>
        <BulkUploadModal
          isVisible={isBulkModalVisible}
          onOk={handleBulkModalOk}
          onCancel={handleBulkModalCancel}
          fileList={fileList}
          updateFileList={updateFileList}
          target="noun"
        />
        <SingleUploadModal
          isVisible={isSingleModalVisible}
          onOk={handleSingleModalOk}
          onCancel={handleSingleModalCancel}
        />
      </div>
    </div>
  );
}

export default Header;
