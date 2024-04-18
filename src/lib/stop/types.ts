export type StopType = {
  id: number;
  content: string;
  isActive: string;
  createdAt: string;
};

export type CreateStopDto = {
  content: string;
};

export type UpdateStopDto = {
  id: number;
  content: string;
  isActive: string;
};

export type DeleteStopDto = {
  id: number;
};
