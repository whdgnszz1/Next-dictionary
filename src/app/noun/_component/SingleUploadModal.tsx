"use client";

import CustomInput from "@/app/ui/shared/Input/CustomInput";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";
import InputError from "@/app/ui/shared/error/InputError";
import { useAnalyzeKeyword } from "@/lib/elastic";
import { useCreateNoun } from "@/lib/noun";
import { analyzeKeywordSuccessHandler } from "@/shared/utils";
import { Button, Modal } from "antd";
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
  const [srchNoun, setSrchNoun] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const [userDefinedTerms, setUserDefinedTerms] = useState("");
  const [morphemeAnalysis, setMorphemeAnalysis] = useState("");

  const onReset = () => {
    setSrchNoun("");
    setUserDefinedTerms("");
    setMorphemeAnalysis("");
    setInputError("");
  };

  const { mutate: createNoun } = useCreateNoun({
    onSuccess: () => {
      onReset();
      onOk();
    },
  });

  const { mutate: analyzeKeyword } = useAnalyzeKeyword({
    onSuccess: (data) => {
      const { definedTerms, formattedMorphemeAnalysis } =
        analyzeKeywordSuccessHandler(data);
      setUserDefinedTerms(definedTerms);
      setMorphemeAnalysis(formattedMorphemeAnalysis);
      setInputError("");
    },
  });

  const handleAnalysis = () => {
    if (!srchNoun) {
      setInputError("단어를 입력해주세요.");
      return;
    }
    setInputError("");
    analyzeKeyword({ text: srchNoun, analyzer: "nori", explain: true });
  };

  const onCancelHandler = () => {
    onReset();
    onCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[\s,]+/g, "");
    setSrchNoun(value);

    if (/[\s,]/.test(e.target.value)) {
      setInputError("키워드는 한 단어만 입력이 가능합니다.");
    } else {
      setInputError("");
    }
  };

  const handleSubmit = () => {
    if (srchNoun) {
      createNoun({ srchNoun });
    } else {
      setInputError("등록할 단어를 입력해주세요.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAnalysis();
    }
  };

  return (
    <Modal
      className="min-h-[500px]"
      title="사용자 사전 등록"
      open={isVisible}
      onCancel={onCancelHandler}
      footer={[
        <Button key="cancel" onClick={onCancelHandler}>
          취소
        </Button>,
        <PrimaryButton key="submit" text="등록" onClick={handleSubmit} />,
      ]}
    >
      <div className="flex gap-2">
        <CustomInput
          type="text"
          placeholder="단어 입력"
          value={srchNoun}
          onChange={handleChange}
          onPressEnter={handleKeyPress}
        />

        <PrimaryButton text="분석" onClick={handleAnalysis} />
      </div>
      {inputError && <InputError error={inputError} />}
      {userDefinedTerms && (
        <div>
          <p className="font-bold pt-4 pb-2">색인 어휘 추출 결과:</p>
          <pre>{userDefinedTerms}</pre>
        </div>
      )}
      {morphemeAnalysis && (
        <>
          <p className="font-bold pt-4 pb-2">형태소 분석 결과:</p>
          <pre>{morphemeAnalysis}</pre>
        </>
      )}
    </Modal>
  );
};

export default SingleUploadModal;
