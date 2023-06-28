import NavWithButton from "@/components/Atom/Nav/WithButton";
import Carousel from "@/components/Molcule/Carousel";
import Header from "@/components/Organism/Header";
import React, { useState } from "react";

const Main = () => {
  const NavMenusMap = new Map<string, string>([
    ["전체", "all"],
    ["자료구조", "dataStructure"],
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
            <Carousel />
          </article>
          <section>Section</section>
        </section>
      </main>
    </>
  );
};

export default Main;
