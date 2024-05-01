"use client";

import React, { useState } from "react";
import { AnalyzeAPIResponse } from "@/shared/types/analyze-api-response";
import { fetchElasticsearch } from "@/shared/api/fetchElasticSearch";
import PrimaryButton from "@/app/ui/shared/button/PrimaryButton";
import CustomInput from "@/app/ui/shared/Input/CustomInput";
import toast from "react-hot-toast";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleAnalysis = async () => {
    if (term.trim() === "") {
      toast.error(`검색어를 입력해주세요.`);
      return;
    }

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

      const tokens = result.detail.tokenizer.tokens;

      const definedTerms = tokens
        .filter(
          (token) => token.morphemes && token.morphemes.includes(token.token)
        )
        .map((token) => token.token)
        .join(", ");

      const morphemeAnalysis = tokens
        .map((token) => `${token.token} : ${token.leftPOS.split("(")[0]}`)
        .join(", ");

      const newResult: SearchResult = {
        key: term,
        text: term,
        indexVocabulary: definedTerms,
        morphemeAnalysis: morphemeAnalysis,
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
    } catch (error) {
      toast.error(`분석 중 오류가 발생했습니다. \n ${error}`);
      console.error("Failed to Analyze", error);
    }
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
        onPressEnter={handleAnalysis}
      />
      <PrimaryButton text="검색" htmlType="submit" />
    </form>
  );
}

export default AnalyzeSearch;
