import React, { useState } from "react";
import Icon from "@/components/Atoms/SVG/Icon";
import { navMenus } from "./constants";

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <header>
      <Icon></Icon>
      <nav>
        {navMenus.map((menu) => {
          return <div>{menu}</div>;
        })}
      </nav>
    </header>
  );
};

export default Header;
