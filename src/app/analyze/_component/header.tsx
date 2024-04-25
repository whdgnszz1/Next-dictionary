import React from "react";
import AnalyzeSearch from "./search";

type Props = {
  onSearchResults: (results: any[]) => void;
};

function AnalyzePageHeader({ onSearchResults }: Props) {
  return (
    <div className="flex items-center justify-between py-2">
      <AnalyzeSearch
        placeholder="키워드 검색"
        onSearchResults={onSearchResults}
      />
    </div>
  );
}

export default AnalyzePageHeader;
