"use client";

import React, { useState } from "react";
import AnalyzePageHeader from "./_component/Header";
import { Table } from "antd";
import { SearchResult } from "./_component/Search";
import { columns } from "./columns";

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
