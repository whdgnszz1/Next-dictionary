"use client";

import CustomInput from "@/app/ui/shared/Input/CustomInput";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";
import InputError from "@/app/ui/shared/error/InputError";
import { useAnalyzeKeyword } from "@/lib/elastic";
import { SynonymType, useCreateSynonym, usePutSynonym } from "@/lib/synonym";
import { analyzeKeywordSuccessHandler } from "@/shared/utils";
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

  const [inputError, setInputError] = useState<string>("");
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
    setInputError("");
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
      const { definedTerms, formattedMorphemeAnalysis } =
        analyzeKeywordSuccessHandler(data);
      setUserDefinedTerms(definedTerms);
      setMorphemeAnalysis(formattedMorphemeAnalysis);
    },
  });

  const handleAnalysis = () => {
    if (!srchSynKeyword) {
      setInputError("단어를 입력해주세요.");
      return;
    }
    setInputError("");
    analyzeKeyword({ text: srchSynKeyword, analyzer: "nori", explain: true });
  };

  const handleSubmit = () => {
    if (!srchSynKeyword || !srchSynTerm) {
      setInputError("모든 필드를 입력해주세요.");
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

    if (field === "keyword" && srchSynOneWayYsno == "Y") {
      value = value.replace(/[\s,]+/g, "");
      setSrchSynKeyword(value);
      if (/[\s,]/.test(e.target.value) && srchSynOneWayYsno == "Y") {
        setInputError("키워드는 한 단어만 입력이 가능합니다.");
      } else {
        setInputError("");
      }
    } else if (field === "keyword" && srchSynOneWayYsno == "N") {
      setSrchSynKeyword(value);
    } else if (field === "term") {
      setSrchSynTerm(value);
    }
  };

  const handleChangeDirection = (e: RadioChangeEvent) => {
    setSrchSynOneWayYsno(e.target.value);
    if (e.target.value === "N") {
      setSrchSynTerm("");
    }
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
      <div className="flex gap-2 py-2">
        <Radio.Group onChange={handleChangeDirection} value={srchSynOneWayYsno}>
          <Radio value="Y" disabled={!!initialSynonym}>
            단방향
          </Radio>
          <Radio value="N" disabled={!!initialSynonym}>
            양방향
          </Radio>
        </Radio.Group>
      </div>
      <p className="px-[2px] pb-1 font-semibold">키워드</p>
      <div className="flex gap-2">
        <CustomInput
          type="text"
          placeholder={
            srchSynOneWayYsno == "Y"
              ? "키워드 입력 (한 단어만 가능)"
              : "키워드 입력"
          }
          value={srchSynKeyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "keyword")
          }
          onPressEnter={handleKeyPress}
        />
        <PrimaryButton text="분석" onClick={handleAnalysis} />
      </div>
      {inputError && <InputError error={inputError} />}

      {srchSynOneWayYsno === "Y" && (
        <>
          <p className="px-[2px] pb-1 mt-2 font-semibold">유의어</p>
          <CustomInput
            type="text"
            placeholder="유의어 입력"
            value={srchSynTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, "term")
            }
          />
        </>
      )}

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
