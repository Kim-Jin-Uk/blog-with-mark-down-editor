/**
 * @copyright 김진욱
 * @description 공통적으로 사용되는 타입들을 관리
 *
 * @created 23-05-12
 * @updated 23-05-12
 */
export class BasicObject<T> {
  [key: string]: T;
}

export type None = undefined | null;
