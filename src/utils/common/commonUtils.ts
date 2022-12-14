import { COLOR } from "./../../constants/constant";
/**
 * 빈 객체 여부 체크
 * @author 곽태욱
 */
export const isEmpty = (obj: {}) => {
  return !obj || Object.keys(obj).length === 0;
};

/**
 * 객체의 keys 추출
 * @author 곽태욱
 */
export const getKeysInObject = (obj: { [key: string]: any }) => {
  return Object.keys(obj);
};

/**
 * 오름차순 sort
 * @author 곽태욱
 */
export const sortAscendingBy = (filed: string) => {
  return function compare(a: any, b: any) {
    if (a[filed] < b[filed]) {
      return -1;
    }
    if (a[filed] > b[filed]) {
      return 1;
    }
    return 0;
  };
};

/**
 * 내림차순 sort
 * @author 곽태욱
 */
export const sortDescendingBy = (filed: string) => {
  return function compare(a: any, b: any) {
    if (a[filed] < b[filed]) {
      return 1;
    }
    if (a[filed] > b[filed]) {
      return -1;
    }
    return 0;
  };
};

/**
 * tr 클릭 시 색 변경
 * @param e
 * @param index
 * @param ref
 * @author 곽태욱
 */
export const clickTrChangeColor = (e: any, index: number, ref: any) => {
  const currentRef = ref.current[index];
  const allRef = ref.current;
  allRef.forEach((element: HTMLTableElement) => {
    element.style.backgroundColor = "transparent";
  });

  currentRef.style.backgroundColor = COLOR.GREEN_PR;
};

export const initTrColor = (ref: any) => {
  const allRef = ref.current;
  allRef.forEach((element: HTMLTableElement) => {
    element.style.backgroundColor = "transparent";
  });
};
