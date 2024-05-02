import { AnalyzeAPIResponse } from "./types/analyze-api-response";

/**
 * 날짜 비교 함수
 * @param {string} date1
 * @param {string} date2
 * @returns {number}
 */
export const compareDates = (date1: string, date2: string): number => {
  return new Date(date1).getTime() - new Date(date2).getTime();
};

/**
 * 분석된 키워드 데이터 처리를 위한 함수
 * 이 함수는 토크나이저에서 반환된 토큰들을 분석하여 정의된 용어들과 형태소 분석 결과를 문자열로 반환합니다.
 * @param {AnalyzeAPIResponse} data - 토크나이저 API로부터 받은 응답 데이터
 * @returns {object} 정의된 용어들과 형태소 분석 결과를 포함하는 객체
 */
export const analyzeKeywordSuccessHandler = (data: AnalyzeAPIResponse) => {
  const tokens = data.detail.analyzer.tokens;
  // 토큰들 중 토큰 값이 형태소 목록에 포함되어 있는 경우를 필터링하여 정의된 용어 추출
  const definedTerms = tokens
    .filter((token) => token.morphemes && token.morphemes.includes(token.token))
    .map((token) => token.token)
    .join(", ");

  // 각 토큰의 토큰 값과 해당 토큰의 왼쪽 형태소 정보를 추출하여 문자열로 조합
  const formattedMorphemeAnalysis = tokens
    .map((token) => `${token.token} : ${token.leftPOS.split("(")[0]}`)
    .join(", ");

  return { definedTerms, formattedMorphemeAnalysis };
};
