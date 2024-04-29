export type NounType = {
  id: number;
  term: string;
  createdAt: string;
};

export type CreateNounDto = {
  term: string;
};

export type DeleteNounDto = {
  id: number;
};
