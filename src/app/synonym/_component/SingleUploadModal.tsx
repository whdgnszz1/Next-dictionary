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
  const [inputs, setInputs] = useState({
    srchSynKeyword: "",
    srchSynTerm: "",
    srchSynOneWayYsno: "Y",
    userDefinedTerms: "",
    morphemeAnalysis: "",
  });
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (initialSynonym) {
      setInputs((inputs) => ({
        ...inputs,
        srchSynKeyword: initialSynonym.srchSynKeyword,
        srchSynTerm: initialSynonym.srchSynTerm,
        srchSynOneWayYsno: initialSynonym.srchSynOneWayYsno,
      }));
    }
  }, [initialSynonym]);

  const onReset = () => {
    setInputs({
      srchSynKeyword: "",
      srchSynTerm: "",
      srchSynOneWayYsno: "Y",
      userDefinedTerms: "",
      morphemeAnalysis: "",
    });
    setInputError("");
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
      setInputs((inputs) => ({
        ...inputs,
        userDefinedTerms: definedTerms,
        morphemeAnalysis: formattedMorphemeAnalysis,
        srchSynKeyword: "",
        srchSynTerm: "",
      }));
    },
  });

  const handleChangeDirection = (e: RadioChangeEvent) => {
    const newDirection = e.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      srchSynOneWayYsno: newDirection,
      srchSynTerm: newDirection === "N" ? "" : prevInputs.srchSynTerm,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof inputs
  ) => {
    const { value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [field]:
        field === "srchSynKeyword" && inputs.srchSynOneWayYsno === "Y"
          ? value.replace(/[\s,]+/g, "")
          : value,
    }));

    if (
      field === "srchSynKeyword" &&
      inputs.srchSynOneWayYsno === "Y" &&
      /[\s,]/.test(value)
    ) {
      setInputError("키워드는 한 단어만 입력이 가능합니다.");
    } else {
      setInputError("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!inputs.srchSynKeyword) {
        setInputError("단어를 입력해주세요.");
        return;
      }
      setInputError("");
      analyzeKeyword({
        text: inputs.srchSynKeyword,
        analyzer: "nori",
        explain: true,
      });
    }
  };

  const handleSubmit = () => {
    if (!inputs.srchSynKeyword || !inputs.srchSynTerm) {
      setInputError("모든 필드를 입력해주세요.");
      return;
    }

    if (initialSynonym) {
      putSynonym({
        srchSynId: initialSynonym?.srchSynId,
        srchSynKeyword: inputs.srchSynKeyword,
        srchSynTerm: inputs.srchSynTerm,
        srchSynOneWayYsno: inputs.srchSynOneWayYsno,
      });
    } else {
      createSynonym({
        srchSynKeyword: inputs.srchSynKeyword,
        srchSynTerm: inputs.srchSynTerm,
        srchSynOneWayYsno: inputs.srchSynOneWayYsno,
      });
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
        <Radio.Group
          onChange={handleChangeDirection}
          value={inputs.srchSynOneWayYsno}
        >
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
            inputs.srchSynOneWayYsno == "Y"
              ? "키워드 입력 (한 단어만 가능)"
              : "키워드 입력"
          }
          value={inputs.srchSynKeyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, "srchSynKeyword")
          }
          onPressEnter={handleKeyPress}
        />
        <PrimaryButton
          key="submit"
          text={initialSynonym ? "수정" : "등록"}
          onClick={handleSubmit}
        />
        ,
      </div>
      {inputError && <InputError error={inputError} />}

      {inputs.srchSynOneWayYsno === "Y" && (
        <>
          <p className="px-[2px] pb-1 mt-2 font-semibold">유의어</p>
          <CustomInput
            type="text"
            placeholder="유의어 입력"
            value={inputs.srchSynTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e, "srchSynTerm")
            }
          />
        </>
      )}

      {inputs.userDefinedTerms && (
        <div>
          <p className="font-bold pt-4 pb-2">색인 어휘 추출 결과:</p>
          <pre>{inputs.userDefinedTerms}</pre>
        </div>
      )}

      {inputs.morphemeAnalysis && (
        <>
          <p className="font-bold pt-4 pb-2">형태소 분석 결과:</p>
          <pre>{inputs.morphemeAnalysis}</pre>
        </>
      )}
    </Modal>
  );
};

export default SingleUploadModal;
