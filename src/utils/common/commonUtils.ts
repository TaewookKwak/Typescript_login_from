/**
 * 빈 객체 여부 체크
 * @author 곽태욱
 */
export const isEmpty = (obj: {}) => {
  return !obj || Object.keys(obj).length === 0;
};
