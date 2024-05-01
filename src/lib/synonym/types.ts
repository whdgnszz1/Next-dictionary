export type SynonymType = {
  srchSynId: number;
  srchSynKeyword: string;
  srchSynTerm: string;
  srchSynOneWayYsno: string;
  cretDttm: string;
  amndDttm: string;
};

export type CreateSynonymDto = {
  srchSynKeyword: string;
  srchSynTerm: string;
  srchSynOneWayYsno: string;
};

export type PutSynonymDto = {
  srchSynId: number;
  srchSynKeyword: string;
  srchSynTerm: string;
  srchSynOneWayYsno: string;
};

export type DeleteSynonymDto = {
  srchSynId: number;
};
