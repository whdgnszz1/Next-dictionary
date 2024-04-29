"use client";

import CustomInput from "@/app/ui/shared/Input/CustomInput";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";
import { useCreateNoun } from "@/lib/noun";
import { fetchElasticsearch } from "@/shared/api/fetchElasticSearch";
import { AnalyzeAPIResponse } from "@/shared/types/analyze-api-response";
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
  const [term, setTerm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AnalyzeAPIResponse>();
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

  const onCancelHandler = () => {
    setTerm("");
    setError("");
    setAnalysisResult(undefined);
    setUserDefinedTerms("");
    onCancel();
  };

  const handleSubmit = () => {
    if (term) {
      createNoun({ term });
    } else {
      setError("단어를 입력해주세요.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAnalysis();
    }
  };

  const handleAnalysis = async () => {
    if (!term) {
      setError("단어를 입력해주세요.");
      return;
    }
    setError("");
    try {
      const result: AnalyzeAPIResponse = await fetchElasticsearch(
        `/nori_index/_analyze`,
        {
          method: "POST",
          body: {
            text: term,
            analyzer: "nori",
            explain: true,
          },
        }
      );
      setAnalysisResult(result);

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
      className="min-h-[500px]"
      title="사용자 사전 등록"
      open={isVisible}
      onCancel={onCancelHandler}
      footer={[
        <Button key="cancel" onClick={onCancelHandler}>
          취소
        </Button>,
        <PrimaryButton text="등록" onClick={handleSubmit} />,
      ]}
    >
      <div className="flex gap-2">
        <CustomInput
          type="text"
          placeholder="단어 입력"
          value={term}
          onChange={handleChange}
          onPressEnter={handleKeyPress}
        />

        <PrimaryButton text="분석" onClick={handleAnalysis} />
      </div>
      {error && <div className="text-red mt-[10px]">{error}</div>}
      {userDefinedTerms && (
        <div>
          <p className="font-bold pt-4 pb-2">색인 어휘 추출 결과:</p>
          <pre>{userDefinedTerms}</pre>
        </div>
      )}

      {analysisResult && (
        <>
          <p className="font-bold pt-4 pb-2">형태소 분석 결과:</p>

          <div>
            {analysisResult.detail.tokenizer.tokens.map((token, index) => (
              <div key={index}>
                <pre>{`${token.token} : ${token.leftPOS.split("(")[0]}`}</pre>
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  );
};

export default SingleUploadModal;
