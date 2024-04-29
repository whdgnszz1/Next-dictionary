import React from "react";
import { Modal, Button, Upload, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { fetchAPI } from "@/shared/api/fetchApi";
import { RcFile, UploadFile } from "antd/es/upload";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";

interface BulkUploadModalProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  fileList: RcFile[];
  updateFileList: (updateFn: (fileList: RcFile[]) => RcFile[]) => void;
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

  const uploadProps: UploadProps = {
    onRemove: (file: UploadFile) => {
      updateFileList((prevList) => prevList.filter((f) => f.uid !== file.uid));
      return true;
    },
    beforeUpload: (file: RcFile, _: RcFile[]) => {
      updateFileList((prevList) => [...prevList, file]);
      return false;
    },
    fileList: fileList.map(
      (file) =>
        ({
          ...file,
          uid: file.uid,
          name: file.name,
          status: "done",
        } as UploadFile)
    ),
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file as Blob);
    });
    formData.append("target", target);

    try {
      await fetchAPI("/bulk-synonym", {
        method: "POST",
        body: formData,
      });
      console.log("Upload successful");
      onOk();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("파일 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Modal
      title="일괄 사전 등록"
      open={isVisible}
      onOk={handleUpload}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          취소
        </Button>,
        <PrimaryButton text="등록" onClick={handleUpload} />,
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
