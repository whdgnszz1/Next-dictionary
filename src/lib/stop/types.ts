export type StopType = {
  id: number;
  content: string;
  createdAt: string;
};

export type CreateStopDto = {
  content: string;
};

export type DeleteStopDto = {
  id: number;
};
