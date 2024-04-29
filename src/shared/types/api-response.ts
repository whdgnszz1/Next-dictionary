import { NounType } from "@/lib/noun";
import { SynonymType } from "@/lib/synonym";

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

export type SynonymListResponse = {
  items: SynonymType[];
  totalCount: number;
};
