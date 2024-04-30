export type NounType = {
  srchNounId: number;
  srchNoun: string;
  cretDttm: string;
};

export type CreateNounDto = {
  srchNoun: string;
};

export type DeleteNounDto = {
  srchNounId: number;
};
