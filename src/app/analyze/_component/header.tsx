import React from "react";
import AnalyzeSearch, { SearchResult } from "./search";

type Props = {
  onSearchResults: (
    updateFunction: (prevResults: SearchResult[]) => SearchResult[]
  ) => void;
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
