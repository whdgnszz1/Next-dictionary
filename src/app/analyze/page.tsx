"use client";

import React, { useState } from "react";
import AnalyzePageHeader from "./_component/Header";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchResult } from "./_component/Search";

const columns: ColumnsType = [
  {
    title: "키워드",
    dataIndex: "text",
    key: "text",
    align: "center",
  },
  {
    title: "색인어휘 추출결과",
    dataIndex: "indexVocabulary",
    key: "indexVocabulary",
    align: "center",
    render: (text: string) => text || "-",
  },
  {
    title: "형태소 분석결과",
    dataIndex: "morphemeAnalysis",
    key: "morphemeAnalysis",
    align: "center",
    render: (text: string) => {
      return (
        <span>
          {text.split(", ").map((part, index) => (
            <span key={index}>
              <b>{part.split(" : ")[0]}</b>
              {" : "}
              {part.split(" : ")[1]}
              {index < text.split(", ").length - 1 ? ", " : ""}
            </span>
          ))}
        </span>
      );
    },
  },
  {
    title: "유의어",
    dataIndex: "synonyms",
    key: "synonyms",
    align: "center",
  },
];

function AnalyzePage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  return (
    <div className="mt-5 w-1/2">
      <AnalyzePageHeader onSearchResults={setSearchResults} />
      <Table
        bordered
        columns={columns}
        dataSource={searchResults}
        pagination={false}
        rowKey="key"
      />
    </div>
  );
}

export default AnalyzePage;
