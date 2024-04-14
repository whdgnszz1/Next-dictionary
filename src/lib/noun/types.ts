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
  content: string;
  isActive: boolean;
};
