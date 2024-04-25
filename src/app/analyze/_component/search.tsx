"use client";

import React, { useState } from "react";
import { Button, Input } from "antd";
import { AnalyzeAPIResponse } from "@/shared/types/analyze-api-response";
import { fetchElasticsearch } from "@/shared/api/fetchElasticSearch";

type Props = {
  placeholder: string;
};

function AnalyzeSearch({ placeholder }: Props) {
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
      console.log(result);
    } catch (error) {
      console.error("분석 중 오류가 발생했습니다", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAnalysis();
    }
  };

  return (
    <form
      onSubmit={handleAnalysis}
      className="flex items-center gap-[10px] p-[10px]"
    >
      <Input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={handleInputChange}
        onPressEnter={handleKeyPress}
      />
      <Button type="primary" htmlType="submit">
        검색
      </Button>
    </form>
  );
}

export default AnalyzeSearch;
