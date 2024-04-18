import { NounType } from "@/lib/noun";

export type ApiResponse<T> = {
  data: T;
  statusCode: number;
  resultMessage: string;
  detailMessage: string | null;
};

export type NounListResponse = {
  items: NounType[];
  totalCount: number;
};
