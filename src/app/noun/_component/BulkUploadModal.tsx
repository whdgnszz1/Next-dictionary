import React from "react";
import { Modal, Button, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { fetchAPI } from "@/shared/api/fetchApi";
import { RcFile } from "antd/es/upload";

interface BulkUploadModalProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  fileList: UploadFile[];
  updateFileList: (updateFn: (fileList: UploadFile[]) => UploadFile[]) => void;
  target: string;
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({
  isVisible,
  onOk,
  onCancel,
  fileList,
  updateFileList,
  target,
}) => {
  const { Dragger } = Upload;

  const uploadProps = {
    onRemove: (file: UploadFile) => {
      updateFileList((prevList) => {
        const index = prevList.indexOf(file);
        const newFileList = [...prevList];
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file: UploadFile) => {
      updateFileList((prevList) => [...prevList, file]);
      return false;
    },
    fileList,
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file as RcFile);
      console.log(file.originFileObj);
    });
    formData.append("target", target);

    try {
      await fetchAPI("/bulk", {
        method: "POST",
        body: formData,
      });
      console.log("Upload successful");
      onOk();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  console.log(123, fileList);
  return (
    <Modal
      title="대량 단어 등록"
      open={isVisible}
      onOk={handleUpload}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          취소
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpload}>
          등록
        </Button>,
      ]}
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="font-semibold">
          파일을 드래그하거나 클릭하여 업로드해주세요.
        </p>
      </Dragger>
    </Modal>
  );
};

export default BulkUploadModal;
