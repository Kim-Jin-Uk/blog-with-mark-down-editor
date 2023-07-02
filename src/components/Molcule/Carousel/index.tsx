import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseMove,
} from "react";
import { makeInfinityCarousel } from "./utils";

const itemWidth = "(100vw - 484px)";

const Carousel = () => {
  const slider = useRef<null | HTMLDivElement>(null);
  const container = useRef<null | HTMLDivElement>(null);
  const [position, setPosition] = useState(1);
  const [isClickable, setIsClickable] = useState(true);
  const startX = useRef<number>(0);
  const endX = useRef<number>(0);
  const [isOver, setIsOver] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [isClick, setIsClick] = useState(false);

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

  const actionDone = () => {
    if (startX.current > endX.current + 20) move(true);
    else if (startX.current < endX.current - 20) move(false);
    else if (Math.abs(startX.current - endX.current) < 5) {
      setIsClick(true);
    } else if (slider.current) {
      slider.current.style.transform = `translateX(calc(-1 * ${itemWidth} * ${position}))`;
    }
  };

  // TODO: 드래그 가능 영역에서만 mouse move 이벤트가 동작하도록 처리한다
  const mouseEnter = (event: ReactMouseMove<HTMLDivElement>) => {
    setIsOver(true); // 현재 드래그 가능 영역임을 표시
  };
  const mouseLeave = (event: ReactMouseMove<HTMLDivElement>) => {
    if (!slider.current) return;

    setIsOver(false);
    slider.current.onmousemove = null;
    if (!isMove) return;
    actionDone();
    setIsMove(false);
  };

  // 웹 이벤트 핸들러
  const mouseMove = (event: MouseEvent) => {
    // 드래그 가능영역에서만 이벤트 발생
    if (!slider.current || !isOver) return;
    endX.current = event.clientX;
    slider.current.style.transform = `translateX(calc(-1 * ${itemWidth} * ${position} + ${
      event.clientX - startX.current
    }px))`;
  };
  const mouseDown = (event: ReactMouseMove<HTMLDivElement>) => {
    if (!slider.current) return;
    slider.current.onmousemove = mouseMove;
    startX.current = event.clientX;
    setIsMove(true);
  };
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
