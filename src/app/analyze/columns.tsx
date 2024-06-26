import React from "react";
import { ColumnsType } from "antd/es/table";

export const columns: ColumnsType = [
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
