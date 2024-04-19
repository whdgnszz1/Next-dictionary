export type NounType = {
  id: number;
  content: string;
  createdAt: string;
};

export type CreateNounDto = {
  content: string;
};

export type UpdateNounDto = {
  id: number;
  content: string;
};

export type DeleteNounDto = {
  id: number;
};
