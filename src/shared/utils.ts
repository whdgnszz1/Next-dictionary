/**
 * 날짜 비교 함수
 * @param {string} date1
 * @param {string} date2
 * @returns {number}
 */
export const compareDates = (date1: string, date2: string): number => {
  return new Date(date1).getTime() - new Date(date2).getTime();
};
