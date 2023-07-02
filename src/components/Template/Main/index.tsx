import NavWithButton from "@/components/Atom/Nav/WithButton";
import Carousel, { AutoMoveHandle } from "@/components/Molcule/Carousel";
import Header from "@/components/Organism/Header";
import React, { useEffect, useRef, useState } from "react";

const Main = () => {
  const NavMenusMap = new Map<string, string>([
    ["전체", "all"],
    ["자료구조", "dataStructure"],
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carousel = useRef<AutoMoveHandle>(null);

  useEffect(() => {
    const autoPageMove = setInterval(() => {
      if (!carousel.current) return;
      carousel.current.autoMove();
    }, 2000);
    return () => clearInterval(autoPageMove);
  }, []);

  return (
    <>
      <Header />
      <main className="main--main-page">
        <NavWithButton
          itemsMap={NavMenusMap}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        ></NavWithButton>
        <section style={{ flex: 1 }}>
          <article>
            <Carousel
              ref={carousel}
              items={[
                <div key={1}>Item1</div>,
                <div key={2}>Item2</div>,
                <div key={3}>Item3</div>,
              ]}
              height={80}
            />
          </article>
          <section>Section</section>
        </section>
      </main>
    </>
  );
};

export default Main;
