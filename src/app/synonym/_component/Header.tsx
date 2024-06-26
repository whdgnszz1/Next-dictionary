"use client";

import React, { useState } from "react";
import { RcFile } from "antd/es/upload";

import Search from "@/app/ui/shared/search/Search";
import BulkUploadModal from "@/app/synonym/_component/BulkUploadModal";
import SingleUploadModal from "@/app/synonym/_component/SingleUploadModal";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";

interface SynonymPageHeaderProps {
  fileList: RcFile[];
  updateFileList: (updateFn: (fileList: RcFile[]) => RcFile[]) => void;
  totalCount: number;
}

function SynonymPageHeader({
  fileList,
  updateFileList,
  totalCount,
}: SynonymPageHeaderProps) {
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
      <div className="flex gap-2 items-center font-semibold">
        <Search placeholder="키워드 검색" />
        <p>키워드 : 총 {totalCount}건</p>
      </div>
      <div className="flex gap-2">
        <PrimaryButton text="추가" onClick={showSingleModal} />
        <PrimaryButton text="일괄 유의어 사전 등록" onClick={showBulkModal} />
        <BulkUploadModal
          isVisible={isBulkModalVisible}
          onOk={handleBulkModalOk}
          onCancel={handleBulkModalCancel}
          fileList={fileList || []}
          updateFileList={updateFileList}
          target="synonym"
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

export default SynonymPageHeader;
