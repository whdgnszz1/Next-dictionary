"use client";

import React, { useState } from "react";
import { useAnalyzeKeyword } from "@/lib/elastic";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";
import CustomInput from "@/app/ui/shared/Input/CustomInput";
import toast from "react-hot-toast";
import { analyzeKeywordSuccessHandler } from "@/shared/utils";

export interface SearchResult {
  key: string;
  text: string;
  indexVocabulary: string;
  morphemeAnalysis: string;
  synonyms: string;
}

type Props = {
  placeholder: string;
  onSearchResults: (
    updateFunction: (prevResults: SearchResult[]) => SearchResult[]
  ) => void;
};

function AnalyzeSearch({ placeholder, onSearchResults }: Props) {
  const [term, setTerm] = useState<string>("");

  const { mutate: analyzeKeyword } = useAnalyzeKeyword({
    onSuccess: (data) => {
      const { definedTerms, formattedMorphemeAnalysis } =
        analyzeKeywordSuccessHandler(data);

      const newResult: SearchResult = {
        key: term,
        text: term,
        indexVocabulary: definedTerms,
        morphemeAnalysis: formattedMorphemeAnalysis,
        synonyms: "",
      };

      onSearchResults((prevResults: SearchResult[]) => {
        const existingKeyIndex = prevResults.findIndex(
          (result) => result.key === newResult.key
        );
        if (existingKeyIndex === -1) {
          return [...prevResults, newResult];
        } else {
          return prevResults;
        }
      });

      setTerm("");
    },
  });

  const handleAnalysis = () => {
    if (term.trim() === "") {
      toast.error(`검색어를 입력해주세요.`);
      return;
    }
    analyzeKeyword({ text: term, analyzer: "nori", explain: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAnalysis();
      }}
      className="flex items-center gap-[10px] p-[10px]"
    >
      <CustomInput
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={handleInputChange}
      />
      <PrimaryButton text="검색" htmlType="submit" />
    </form>
  );
}

export default AnalyzeSearch;
