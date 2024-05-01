import React from "react";
import { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import { SynonymType } from "@/lib/synonym";
import { compareDates } from "@/shared/utils";

export const getColumns = (
  handleEdit: (record: SynonymType) => void,
  handleDelete: (srchSynId: number) => void
): ColumnsType<SynonymType> => [
  {
    title: "키워드",
    dataIndex: "srchSynKeyword",
    key: "srchSynKeyword",
    align: "center",
  },
  {
    title: "유의어",
    dataIndex: "srchSynTerm",
    key: "srchSynTerm",
    align: "center",
  },
  {
    title: "생성일",
    dataIndex: "cretDttm",
    key: "cretDttm",
    sorter: (a: SynonymType, b: SynonymType) =>
      compareDates(a.cretDttm, b.cretDttm),
    render: (cretDttm) => cretDttm?.split("T")[0],
    align: "center",
  },
  {
    title: "수정일",
    dataIndex: "amndDttm",
    key: "amndDttm",
    sorter: (a: SynonymType, b: SynonymType) =>
      compareDates(a.amndDttm, b.amndDttm),
    render: (amndDttm) => amndDttm?.split("T")[0],
    align: "center",
  },
  {
    title: "관리",
    key: "action",
    align: "center",
    render: (_, record: SynonymType) => (
      <div className="flex gap-2 justify-center items-center">
        <Button onClick={() => handleEdit(record)} type="primary">
          수정
        </Button>
        <Button
          onClick={() => handleDelete(record.srchSynId)}
          type="primary"
          danger
        >
          삭제
        </Button>
      </div>
    ),
  },
];
