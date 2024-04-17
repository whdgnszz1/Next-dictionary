export type NounType = {
  id: number;
  content: string;
  isActive: string;
  createdAt: string;
};

export type CreateNounDto = {
  content: string;
};

export type UpdateNounDto = {
  id: number;
  content: string;
  isActive: string;
};

export type DeleteNounDto = {
  id: number;
};
