export type SynonymType = {
  srchSynId: number;
  content: string;
  isOneWay: string;
  createdAt: string;
};

export type CreateSynonymDto = {
  content: string;
  isOneWay: string;
};

export type UpdateSynonymDto = {
  id: number;
  content: string;
  isOneWay: string;
};

export type DeleteSynonymDto = {
  id: number;
};
