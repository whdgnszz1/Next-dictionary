"use client";

import { useCreateNoun } from "@/lib/noun";
import { Button, Input, Modal } from "antd";
import { useState } from "react";

interface SingleUploadModalProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const SingleUploadModal: React.FC<SingleUploadModalProps> = ({
  isVisible,
  onOk,
  onCancel,
}) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { mutate: createNoun } = useCreateNoun({
    onSuccess: () => {
      console.log("단어가 성공적으로 추가되었습니다.");
      onOk();
    },
    onError: (error) => {
      console.error("단어 추가 중 오류가 발생했습니다.", error);
    },
  });

  const handleSubmit = () => {
    if (content) {
      createNoun({ content });
    } else {
      setError("단어를 입력해주세요.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.includes(" ")) {
      setError("띄어쓰기는 입력할 수 없습니다.");
      setContent(inputValue.replace(/\s/g, ""));
    } else {
      setContent(inputValue);
      setError("");
    }
  };

  return (
    <Modal
      title="단어 추가"
      open={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          취소
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          등록하기
        </Button>,
      ]}
    >
      <Input
        type="text"
        placeholder="단어 입력"
        value={content}
        onChange={handleChange}
        maxLength={255}
      />
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </Modal>
  );
};

export default SingleUploadModal;
