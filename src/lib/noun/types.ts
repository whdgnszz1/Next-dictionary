export type NounType = {
  id: number;
  content: string;
  isActive: boolean;
  createdAt: string;
};

export type CreateNounDto = {
  content: string;
};

export type UpdateNounDto = {
  id: number;
  content: string;
  isActive: boolean;
};

export type DeleteNounDto = {
  id: number;
};
