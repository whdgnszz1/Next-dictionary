export type SrchUserKywrType = {
  srchUserKywrId: number;
  srchUserKywr: string;
  srchComplxUserKywr?: string;
  cretDttm: string;
  amndDttm: string;
};

export type CreateSrchUserKywrDto = {
  srchUserKywrs: string[];
};

export type BulkUploadSrchUserKywr = FormData;

export type PutSrchUserKywrDto = {
  srchUserKywrId: number;
  srchUserKywr: string;
};

export type DeleteSrchUserKywrDto = {
  srchUserKywrId: number;
};
