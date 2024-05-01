"use client";

import CustomInput from "@/app/ui/shared/Input/CustomInput";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";
import { useAnalyzeKeyword } from "@/lib/elastic";
import { SynonymType, useCreateSynonym, usePutSynonym } from "@/lib/synonym";
import { fetchElasticsearch } from "@/shared/api/fetchElasticSearch";
import { AnalyzeAPIResponse } from "@/shared/types/analyze-api-response";
import { Button, Modal, Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";

interface SingleUploadModalProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  initialSynonym?: SynonymType | null;
}

const SingleUploadModal: React.FC<SingleUploadModalProps> = ({
  isVisible,
  onOk,
  onCancel,
  initialSynonym,
}) => {
  const [srchSynKeyword, setSrchSynKeyword] = useState<string>("");
  const [srchSynTerm, setSrchSynTerm] = useState<string>("");
  const [srchSynOneWayYsno, setSrchSynOneWayYsno] = useState<string>("Y");

  const [error, setError] = useState<string>("");
  const [userDefinedTerms, setUserDefinedTerms] = useState("");
  const [morphemeAnalysis, setMorphemeAnalysis] = useState("");

  useEffect(() => {
    if (initialSynonym) {
      setSrchSynKeyword(initialSynonym.srchSynKeyword);
      setSrchSynTerm(initialSynonym.srchSynTerm);
      setSrchSynOneWayYsno(initialSynonym.srchSynOneWayYsno);
    }
  }, [initialSynonym]);

  const onReset = () => {
    setSrchSynKeyword("");
    setSrchSynTerm("");
    setSrchSynOneWayYsno("Y");
    setError("");
    setUserDefinedTerms("");
  };

  const { mutate: createSynonym } = useCreateSynonym({
    onSuccess: () => {
      onReset();
      onOk();
    },
  });

  const { mutate: putSynonym } = usePutSynonym({
    onSuccess: () => {
      onReset();
      onOk();
    },
  });

  const { mutate: analyzeKeyword } = useAnalyzeKeyword({
    onSuccess: (data) => {
      const tokens = data.detail.tokenizer.tokens;

      const definedTerms = tokens
        .filter(
          (token) => token.morphemes && token.morphemes.includes(token.token)
        )
        .map((token) => token.token)
        .join(", ");
      setUserDefinedTerms(definedTerms);

      const formattedMorphemeAnalysis = tokens
        .map((token) => `${token.token} : ${token.leftPOS.split("(")[0]}`)
        .join(", ");
      setMorphemeAnalysis(formattedMorphemeAnalysis);

      setError("");
    },
    onError: (error) => {
      console.error("분석 중 오류가 발생했습니다", error);
      setError("분석 중 오류가 발생했습니다.");
    },
  });

  const handleAnalysis = () => {
    if (!srchSynKeyword) {
      setError("단어를 입력해주세요.");
      return;
    }
    setError("");
    analyzeKeyword({ text: srchSynKeyword, analyzer: "nori", explain: true });
  };

  const handleSubmit = () => {
    if (!srchSynKeyword || !srchSynTerm) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (initialSynonym) {
      putSynonym({
        srchSynId: initialSynonym?.srchSynId,
        srchSynKeyword,
        srchSynTerm,
        srchSynOneWayYsno,
      });
    } else {
      createSynonym({ srchSynKeyword, srchSynTerm, srchSynOneWayYsno });
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
    let value = e.target.value;

    if (field === "keyword") {
      value = value.replace(/[\s,]+/g, "");
      setSrchSynKeyword(value);
      if (/[\s,]/.test(e.target.value)) {
        setError("키워드는 한 단어만 입력이 가능합니다.");
      } else {
        setError("");
      }
    } else if (field === "term") {
      setSrchSynTerm(value);
    }
  };

  const handleChangeDirection = (e: RadioChangeEvent) => {
    setSrchSynOneWayYsno(e.target.value);
  };

  const onCancelHandler = () => {
    onReset();
    onCancel();
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
        <PrimaryButton
          key="submit"
          text={initialSynonym ? "수정" : "등록"}
          onClick={handleSubmit}
        />,
      ]}
    >
      <div className="flex gap-2">
        <CustomInput
          type="text"
          placeholder="키워드 입력 (한 단어만 가능)"
          value={srchSynKeyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "keyword")
          }
          onPressEnter={handleKeyPress}
        />
        <PrimaryButton text="분석" onClick={handleAnalysis} />
      </div>
      {error && <div className="text-red-500 mt-[10px] px-[2px]">{error}</div>}
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
