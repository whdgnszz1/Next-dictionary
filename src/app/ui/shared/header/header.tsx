"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import { RcFile } from "antd/es/upload";

import Search from "@/app/ui/shared/search/search";
import BulkUploadModal from "@/app/noun/_component/BulkUploadModal";
import styles from "@/app/ui/noun/noun.module.css";

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
    <div className={styles.top}>
      <Search placeholder="키워드 검색" />
      <div className={styles.button_wrapper}>
        <Link href="/noun/add">
          <Button>추가하기</Button>
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
