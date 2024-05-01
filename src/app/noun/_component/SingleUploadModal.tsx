"use client";

import CustomInput from "@/app/ui/shared/Input/CustomInput";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";
import { useAnalyzeKeyword } from "@/lib/elastic";
import { useCreateNoun } from "@/lib/noun";
import { fetchElasticsearch } from "@/shared/api/fetchElasticSearch";
import { AnalyzeAPIResponse } from "@/shared/types/analyze-api-response";
import { analyzeKeywordSuccessHandler } from "@/shared/utils";
import { Button, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const [error, setError] = useState<string>("");
  const [userDefinedTerms, setUserDefinedTerms] = useState("");
  const [morphemeAnalysis, setMorphemeAnalysis] = useState("");

  const onReset = () => {
    setSrchNoun("");
    setUserDefinedTerms("");
    setMorphemeAnalysis("");
    setError("");
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
      setError("");
    },
  });

  const handleAnalysis = () => {
    if (!srchNoun) {
      setError("단어를 입력해주세요.");
      return;
    }
    setError("");
    analyzeKeyword({ text: srchNoun, analyzer: "nori", explain: true });
  };

  const onCancelHandler = () => {
    onReset();
    onCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSrchNoun(e.target.value);
    setError("");
  };

  const handleSubmit = () => {
    if (srchNoun) {
      createNoun({ srchNoun });
    } else {
      setError("등록할 단어를 입력해주세요.");
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
      {error && <div className="text-red-500 mt-[10px] px-[2px]">{error}</div>}
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
