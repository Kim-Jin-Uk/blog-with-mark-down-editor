import React, { useEffect, useRef, useState } from "react";
import { makeInfinityCarousel } from "./utils";

const itemWidth = "(100vw - 484px)";

const Carousel = () => {
  const container = useRef<null | HTMLDivElement>(null);
  const slider = useRef<null | HTMLDivElement>(null);
  const [position, setPosition] = useState(1);
  const [isClickable, setIsClickable] = useState(true);
  // TODO: touch, click 이벤트 감지하여 캐루셀을 이동
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [isMove, setIsMove] = useState(false);
  const [isClick, setIsClick] = useState(false);
  // TODO: 캐루셀 영역을 감지
  const [isOver, setIsOver] = useState(false);

  const Carousel = {
    items: [
      <div
        key={1}
        style={{
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
    // (클릭할 수 없는 상태 || 아이템 수가 1개 이하 || 아직 ref변수에 container 할당이 되지 않은 상태)이면 리턴
    if (!isClickable || Carousel.items.length <= 1 || !container.current)
      return;

    // 액션이 끝나기까지는 추가 클릭 방지
    setIsClickable(false);

    const nextPosition = position < Carousel.items.length ? position + 1 : 1;
    const prevposition = position > 1 ? position - 1 : Carousel.items.length;
    // 다음 포지션으로 갱신
    const afterPosition = isNext ? nextPosition : prevposition;
    setPosition(afterPosition);
    // 다음 아이템으로 이동
    container.current.style.transform = `translateX(calc(-1 * ${itemWidth} * ${
      position + 1 * (isNext ? 1 : -1)
    }))`;

    const lastPosition = Carousel.items.length;
    const firstPosition = 1;

    setTimeout(() => {
      if (
        (isNext && position < lastPosition) ||
        (!isNext && position > firstPosition) ||
        !container.current
      ) {
        setIsClickable(true);
        return;
      }
      // 무한 캐루셀처럼 보이도록 처리
      makeInfinityCarousel(
        container.current,
        `translateX(calc(-1 * ${itemWidth} * ${
          isNext ? firstPosition : lastPosition
        }))`,
        () => setIsClickable(true)
      );
    }, 500);
  };

  useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <>
      <div
        ref={slider}
        style={{
          width: `calc(${itemWidth})`,
          height: "auto",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <div
          ref={container}
          style={{
            backgroundColor: "blue",
            width: `calc(${Carousel.items.length + 2} * ${itemWidth})`,
            position: "relative",
            display: "flex",
            height: Carousel.height,
            transition: "transform 0.5s",
            transform: `translateX(calc(-1 * ${itemWidth}))`,
          }}
        >
          {Carousel.items.length > 1 && Carousel.items.at(-1)}
          {Carousel.items.map((Item) => Item)}
          {Carousel.items.length > 1 && Carousel.items[0]}
        </div>
        <button onClick={() => move(false)}> back </button>
        <button onClick={() => move(true)}> next </button>
      </div>
    </>
  );
};

export default Carousel;
