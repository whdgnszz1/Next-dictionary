"use client";

import React, { useState } from "react";
import { Button, Input } from "antd";
import { AnalyzeAPIResponse } from "@/shared/types/analyze-api-response";
import { fetchElasticsearch } from "@/shared/api/fetchElasticSearch";

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
      console.log("검색어가 비어있습니다.");
      return;
    }

    try {
      const result: AnalyzeAPIResponse = await fetchElasticsearch(
        `/nori_index/_analyze`,
        {
          method: "POST",
          body: JSON.stringify({
            text: term,
            analyzer: "nori",
            explain: true,
          }),
          headers: {
            "Content-Type": "application/json",
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
        key: tokens.map((t) => t.start_offset).join(","),
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
          console.error("중복된 키가 발생했습니다:", newResult.key);
          return prevResults;
        }
      });
    } catch (error) {
      console.error("분석 중 오류가 발생했습니다", error);
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
      <Input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={handleInputChange}
        onPressEnter={handleAnalysis}
      />
      <Button type="primary" htmlType="submit">
        검색
      </Button>
    </form>
  );
}

export default AnalyzeSearch;
