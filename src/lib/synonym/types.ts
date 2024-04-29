export type SynonymType = {
  srchSynId: number;
  srchSynKeyword: string;
  srchSynTerm: string;
  srchSynOneWayYsno: string;
  cretDttm: string;
};

export type CreateSynonymDto = {
  srchSynKeyword: string;
  srchSynTerm: string;
  srchSynOneWayYsno: string;
};

export type DeleteSynonymDto = {
  id: number;
};
