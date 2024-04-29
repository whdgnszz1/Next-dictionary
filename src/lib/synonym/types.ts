export type SynonymType = {
  srchSynId: number;
  srchSynKeyword: string;
  srchSynTerm: string;
  srchSynOneWayYsno: string;
  createdAt?: string;
};

export type CreateSynonymDto = {
  srchSynKeyword: string;
  srchSynTerm: string;
  srchSynOneWayYsno: string;
};

export type DeleteSynonymDto = {
  id: number;
};
