export interface AnalyzeAPIResponse {
  detail: {
    custom_analyzer: boolean;
    charfilters: any[];
    tokenizer: TokenizerDetail;
    tokenfilters: any[];
  };
}

interface TokenizerDetail {
  name: string;
  tokens: Token[];
}

interface Token {
  token: string;
  start_offset: number;
  end_offset: number;
  type: string;
  position: number;
  bytes: string;
  leftPOS: string;
  morphemes?: string | null;
  posType: string;
  positionLength: number;
  reading?: string | null;
  rightPOS: string;
  termFrequency: number;
}
