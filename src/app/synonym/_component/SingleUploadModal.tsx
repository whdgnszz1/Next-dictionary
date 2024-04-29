"use client";

import CustomInput from "@/app/ui/shared/Input/CustomInput";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";
import { useCreateSynonym } from "@/lib/synonym";
import { fetchElasticsearch } from "@/shared/api/fetchElasticSearch";
import { AnalyzeAPIResponse } from "@/shared/types/analyze-api-response";
import { Button, Modal, Radio, RadioChangeEvent } from "antd";
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
  const [srchSynKeyword, setSrchSynKeyword] = useState<string>("");
  const [srchSynTerm, setSrchSynTerm] = useState<string>("");
  const [srchSynOneWayYsno, setSrchSynOneWayYsno] = useState<string>("Y");

  const [error, setError] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AnalyzeAPIResponse>();
  const [userDefinedTerms, setUserDefinedTerms] = useState("");

  const { mutate: createSynonym } = useCreateSynonym({
    onSuccess: () => {
      console.log("단어가 성공적으로 추가되었습니다.");
      setSrchSynKeyword("");
      setSrchSynTerm("");
      setSrchSynOneWayYsno("Y");
      onOk();
    },
    onError: (error) => {
      console.error("단어 추가 중 오류가 발생했습니다.", error);
    },
  });

  const handleSubmit = () => {
    if (srchSynKeyword && srchSynTerm) {
      createSynonym({ srchSynKeyword, srchSynTerm, srchSynOneWayYsno });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target;
    if (field === "keyword") {
      setSrchSynKeyword(value);
    } else if (field === "term") {
      setSrchSynTerm(value);
    }
    setError("");
  };

  const handleChangeDirection = (e: RadioChangeEvent) => {
    setSrchSynOneWayYsno(e.target.value);
  };

  const onCancelHandler = () => {
    setSrchSynKeyword("");
    setSrchSynTerm("");
    setSrchSynOneWayYsno("Y");
    setError("");
    setAnalysisResult(undefined);
    setUserDefinedTerms("");
    onCancel();
  };

  const handleAnalysis = async () => {
    if (!srchSynKeyword) {
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
            text: srchSynKeyword,
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

  return (
    <Modal
      className="min-h-[500px]"
      title="유의어 사전 등록"
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
          placeholder="키워드 입력"
          value={srchSynKeyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "keyword")
          }
          onPressEnter={handleKeyPress}
        />
        <PrimaryButton text="분석" onClick={handleAnalysis} />
      </div>
      {error && <div className="text-red mt-[10px]">{error}</div>}
      <div className="flex gap-2 py-2">
        <Radio.Group onChange={handleChangeDirection} value={srchSynOneWayYsno}>
          <Radio value="Y">단방향</Radio>
          <Radio value="N">양방향</Radio>
        </Radio.Group>
      </div>
      <CustomInput
        type="text"
        placeholder="유의어 입력"
        value={srchSynTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, "term")
        }
      />

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
