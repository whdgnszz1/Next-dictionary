"use client";

import React, { useState } from "react";
import { Button, Input } from "antd";
import { AnalyzeAPIResponse } from "@/shared/types/analyze-api-response";
import { fetchElasticsearch } from "@/shared/api/fetchElasticSearch";

type Props = {
  placeholder: string;
  onSearchResults: (results: any[]) => void;
};

function AnalyzeSearch({ placeholder, onSearchResults }: Props) {
  const [term, setTerm] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleAnalysis = async () => {
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

      const tokens = result.detail.tokenizer.tokens.map((token) => ({
        text: token.token,
        start: token.start_offset,
        end: token.end_offset,
        type: token.type,
      }));
      onSearchResults(tokens);
    } catch (error) {
      console.error("분석 중 오류가 발생했습니다", error);
      onSearchResults([]);
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
