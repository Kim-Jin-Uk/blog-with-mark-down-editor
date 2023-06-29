/**
 * 캐루셀을 Infinity 형태로 만들어 주는 함수
 *
 * @description transition 값을 날린다 => 도착 지점으로 캐루셀을 이동시킨다 => transition 값을 설정하여 자연스럽게 보이도록 처리한다
 *
 * @param carousel 캐루셀 엘리먼트
 * @param arrivalPosition 이동시킬 포지션
 * @param callBack 함수 종료후 호출시킬 함수
 */
export const makeInfinityCarousel = (
  carousel: HTMLDivElement,
  arrivalPosition: string,
  callBack: () => void = () => null
) => {
  carousel.style.transition = "none";
  carousel.style.transform = arrivalPosition;
  requestAnimationFrame(() => {
    carousel.style.transition = "transform 0.5s";
    callBack();
  });
};
