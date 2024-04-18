export type SynonymType = {
  id: number;
  content: string;
  isActive: string;
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
  isActive: string;
  isOneWay: string;
};

export type DeleteSynonymDto = {
  id: number;
};
