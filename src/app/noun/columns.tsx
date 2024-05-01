import React from "react";
import { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import { NounType } from "@/lib/noun";
import { compareDates } from "@/shared/utils";

export const getColumns = (
  handleDelete: (id: number) => void
): ColumnsType<NounType> => [
  {
    title: "키워드",
    dataIndex: "srchNoun",
    key: "srchNoun",
    sorter: (a: NounType, b: NounType) => a.srchNoun.localeCompare(b.srchNoun),
    align: "center",
  },
  {
    title: "생성일",
    dataIndex: "cretDttm",
    key: "cretDttm",
    sorter: (a: NounType, b: NounType) => compareDates(a.cretDttm, b.cretDttm),
    render: (cretDttm: string) => cretDttm.split("T")[0],
    align: "center",
  },
  {
    title: "관리",
    key: "action",
    align: "center",
    render: (_: any, record: NounType) => (
      <div className="flex gap-2 justify-center items-center">
        <Button
          onClick={() => handleDelete(record.srchNounId)}
          type="primary"
          danger
        >
          삭제
        </Button>
      </div>
    ),
  },
];
