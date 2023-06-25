import React from "react";

const Carousel = () => {
  const width = "calc(100vw - 484px)";
  const Carousel = {
    items: [
      <div
        style={{
          width: width,
          minWidth: "230px",
          height: "auto",
          margin: "0 10px",
        }}
      >
        Item1
      </div>,
      <div
        style={{
          width: width,
          minWidth: "230px",
          height: "auto",
          margin: "0 10px",
        }}
      >
        Item2
      </div>,
    ],
    width: "100%",
    height: "80px",
  };

  const movePrev = () => {
    if (Carousel.items.length > 1) {
    }
  };
  return (
    <>
      <div
        style={{
          width: width,
          height: "auto",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "blue",
            width: "200000px",
            position: "relative",
            display: "flex",
            height: Carousel.height,
            transition: "transform 0.5s",
          }}
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
