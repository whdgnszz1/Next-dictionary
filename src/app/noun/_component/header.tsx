"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { RcFile } from "antd/es/upload";

import Search from "@/app/ui/shared/search/search";
import BulkUploadModal from "@/app/noun/_component/BulkUploadModal";
import SingleUploadModal from "@/app/noun/_component/SingleUploadModal";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";

interface NounPageHeaderProps {
  fileList: RcFile[];
  updateFileList: (updateFn: (fileList: RcFile[]) => RcFile[]) => void;
}

function NounPageHeader({ fileList, updateFileList }: NounPageHeaderProps) {
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
        <PrimaryButton text="추가" onClick={showSingleModal} />
        <PrimaryButton text="일괄 사용자 사전 등록" onClick={showBulkModal} />
        <BulkUploadModal
          isVisible={isBulkModalVisible}
          onOk={handleBulkModalOk}
          onCancel={handleBulkModalCancel}
          fileList={fileList || []}
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

export default NounPageHeader;
