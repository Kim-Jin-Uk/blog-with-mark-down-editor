import React, { useState, MouseEvent as ReactMouseMove } from "react";
import { makeInfinityCarousel } from "./utils";
import { useRefs, useStates } from "@/common/utils";

const itemWidth = "(100vw - 484px)";

const Carousel = () => {
  const [slider, container] = useRefs<null | HTMLDivElement>([null, null]);
  const [startX, endX] = useRefs<number>([0, 0]);

  const [position, setPosition] = useState(1);
  const [
    [isClickable, setIsClickable],
    [isOver, setIsOver],
    [isMove, setIsMove],
    [isClick, setIsClick],
  ] = useStates<boolean>([true, false, false, false]);

  const Carousel = {
    items: [
      <div
        key={1}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          width: `calc(${itemWidth})`,
          minWidth: "230px",
          height: "auto",
          margin: "0",
          backgroundColor: "green",
        }}
      >
        Item1
      </div>,
      <div
        key={2}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          width: `calc(${itemWidth})`,
          minWidth: "230px",
          height: "auto",
          margin: "0",
          backgroundColor: "green",
        }}
      >
        Item2
      </div>,
      <div
        key={3}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          width: `calc(${itemWidth})`,
          minWidth: "230px",
          height: "auto",
          margin: "0",
          backgroundColor: "green",
        }}
      >
        Item3
      </div>,
    ],
    height: "80px",
  };

  /**
   * 캐루셀을 이동시키는 함수
   *
   * @param isNext 다음으로 이동할지 이전으로 이동할지 판단하는 변수
   */
  const move = (isNext: boolean) => {
    // (클릭할 수 없는 상태 || 아이템 수가 1개 이하 || 아직 ref변수에 slider 할당이 되지 않은 상태)이면 리턴
    if (!isClickable || Carousel.items.length <= 1 || !slider.current) return;

    // 액션이 끝나기까지는 추가 클릭 방지
    setIsClickable(false);

    const nextPosition = position < Carousel.items.length ? position + 1 : 1;
    const prevposition = position > 1 ? position - 1 : Carousel.items.length;
    // 다음 포지션으로 갱신
    const afterPosition = isNext ? nextPosition : prevposition;
    setPosition(afterPosition);
    // 다음 아이템으로 이동
    slider.current.style.transform = `translateX(calc(-1 * ${itemWidth} * ${
      position + 1 * (isNext ? 1 : -1)
    }))`;

    const lastPosition = Carousel.items.length;
    const firstPosition = 1;

    setTimeout(() => {
      if (
        (isNext && position < lastPosition) ||
        (!isNext && position > firstPosition) ||
        !slider.current
      ) {
        setIsClickable(true);
        return;
      }
      // 무한 캐루셀처럼 보이도록 처리
      makeInfinityCarousel(
        slider.current,
        `translateX(calc(-1 * ${itemWidth} * ${
          isNext ? firstPosition : lastPosition
        }))`,
        () => setIsClickable(true)
      );
    }, 500);
  };

  /**
   * 캐루셀 이동시 이벤트를 종료시키는 함수
   * 상황에 따라 다음, 이전 아이템으로 이동시키거나 다시 원복한다
   */
  const actionDone = () => {
    if (startX.current > endX.current + 20) move(true);
    else if (startX.current < endX.current - 20) move(false);
    else if (Math.abs(startX.current - endX.current) < 5) {
      setIsClick(true);
    } else if (slider.current) {
      slider.current.style.transform = `translateX(calc(-1 * ${itemWidth} * ${position}))`;
    }
  };

  /**
   * MouseEnter 이벤트 발생시 마우스가 캐루셀 영역에 위치함을 표시하는 함수
   */
  const mouseEnter = () => {
    setIsOver(true);
  };
  /**
   * MouseLeave 이벤트 발생시 마우스가 캐루셀 영역에 위치하지 않음을 표시하고 이동을 완료시키는 함수
   */
  const mouseLeave = () => {
    if (!slider.current) return;

    setIsOver(false);
    slider.current.onmousemove = null;
    if (!isMove) return;
    actionDone();
    setIsMove(false);
  };
  /**
   * MouseMove 이벤트 발생시 캐루셀을 이동시키는 함수
   */
  const mouseMove = (event: MouseEvent) => {
    // 캐루셀 영역에서만 이벤트 발생
    if (!slider.current || !isOver) return;
    endX.current = event.clientX;
    slider.current.style.transform = `translateX(calc(-1 * ${itemWidth} * ${position} + ${
      event.clientX - startX.current
    }px))`;
  };
  /**
   * MouseDown 이벤트 발생시 mouseMove 핸들러를 등록해주고 이벤트 시작 위치를 표시하는 함수
   */
  const mouseDown = (event: ReactMouseMove<HTMLDivElement>) => {
    if (!slider.current) return;
    slider.current.onmousemove = mouseMove;
    startX.current = event.clientX;
    setIsMove(true);
  };
  /**
   * MouseUp 이벤트 발생시 mouseMove 핸들러를 삭제해주고 캐루셀 이동을 완료시키는 함수
   */
  const mouseUp = (event: ReactMouseMove<HTMLDivElement>) => {
    if (!slider.current) return;
    slider.current.onmousemove = null;
    endX.current = event.clientX;
    actionDone();
    setIsMove(false);
  };

  return (
    <>
      <div
        ref={container}
        style={{
          width: `calc(${itemWidth})`,
          height: "auto",
          overflow: "hidden",
          margin: "0 auto",
          display: "inline-block",
        }}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <div
          ref={slider}
          style={{
            backgroundColor: "blue",
            width: `calc(${Carousel.items.length + 2} * ${itemWidth})`,
            position: "relative",
            display: "flex",
            height: Carousel.height,
            transition: "transform 0.5s",
            transform: `translateX(calc(-1 * ${itemWidth}))`,
          }}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
        >
          {Carousel.items.length > 1 && Carousel.items.at(-1)}
          {Carousel.items.map((Item) => Item)}
          {Carousel.items.length > 1 && Carousel.items[0]}
        </div>
      </div>
    </>
  );
};

export default Carousel;
