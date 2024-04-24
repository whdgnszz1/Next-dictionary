"use client";

import { useCreateNoun } from "@/lib/noun";
import { fetchElasticsearch } from "@/shared/api/fetchElasticSearch";
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
  const [term, setTerm] = useState("");
  const [error, setError] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [userDefinedTerms, setUserDefinedTerms] = useState("");

  const { mutate: createNoun } = useCreateNoun({
    onSuccess: () => {
      console.log("단어가 성공적으로 추가되었습니다.");
      setTerm("");
      onOk();
    },
    onError: (error) => {
      console.error("단어 추가 중 오류가 발생했습니다.", error);
    },
  });

  const handleSubmit = () => {
    if (term) {
      createNoun({ term });
    } else {
      setError("단어를 입력해주세요.");
    }
  };

  const handleAnalysis = async () => {
    if (!term) {
      setError("단어를 입력해주세요.");
      return;
    }
    setError("");
    try {
      const result = await fetchElasticsearch(`/nori_index/_analyze`, {
        method: "POST",
        body: {
          text: term,
          analyzer: "nori",
          explain: true,
        },
      });
      setAnalysisResult(JSON.stringify(result, null, 2));

      const definedTerms = result.detail.tokenizer.tokens
        .filter((token) => {
          return token.morphemes && token.morphemes.includes(token.token);
        })
        .map((token) => token.token)
        .join(", ");
      setUserDefinedTerms(definedTerms);
    } catch (error) {
      console.error("분석 중 오류가 발생했습니다", error);
      setError("분석 중 오류가 발생했습니다.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    setError("");
  };

  return (
    <Modal
      title="사용자 사전 등록"
      open={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          취소
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          등록
        </Button>,
      ]}
    >
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="단어 입력"
          value={term}
          onChange={handleChange}
          maxLength={255}
        />
        <Button onClick={handleAnalysis}>분석</Button>
      </div>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      {userDefinedTerms && (
        <div>
          <p className="font-bold py-4">색인 어휘 추출 결과:</p>
          <pre>{userDefinedTerms}</pre>
        </div>
      )}

      {analysisResult && (
        <div>
          <p className="font-bold py-4">형태소 분석 결과:</p>
          <pre>{analysisResult}</pre>
        </div>
      )}
    </Modal>
  );
};

export default SingleUploadModal;
