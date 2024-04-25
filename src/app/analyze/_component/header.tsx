import React from "react";
import AnalyzeSearch from "./search";

function AnalyzePageHeader() {
  return (
    <div className="flex items-center justify-between py-2">
      <AnalyzeSearch placeholder="키워드 검색" />
    </div>
  );
}

export default AnalyzePageHeader;
