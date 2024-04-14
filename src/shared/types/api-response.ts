export type ApiResponse<T> = {
  data: T;
  statusCode: number;
  resultMessage: string;
  detailMessage: string | null;
};
