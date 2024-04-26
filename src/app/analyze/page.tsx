"use client";

import React, { useState } from "react";
import AnalyzePageHeader from "./_component/header";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchResult } from "./_component/search";

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
    <>
      <AnalyzePageHeader onSearchResults={setSearchResults} />
      <div className="w-1/2">
        <Table
          bordered
          columns={columns}
          dataSource={searchResults}
          pagination={false}
          rowKey="key"
        />
      </div>
    </>
  );
}

export default AnalyzePage;
