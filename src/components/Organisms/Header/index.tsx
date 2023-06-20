import React, { useState } from "react";
import Icon from "@/components/Atoms/SVG/Logo";
import { navMenus } from "./constants";
import Nav from "@/components/Atoms/Nav";
import Button from "@/components/Atoms/Button";
import { convertObjectToButtonInterface } from "@/components/Atoms/Button/utils";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <header>
      <Icon></Icon>
      <Nav items={navMenus}></Nav>
      <div style={{ flex: 1 }}></div>
      {isLogin ? (
        <div></div>
      ) : (
        <>
          <Button
            buttonInterface={convertObjectToButtonInterface({
              shape: "round",
              background: "white",
              color: "black",
              hasBorder: false,
              height: 36,
              fontSize: 14,
            })}
          >
            로그인
          </Button>
          <Button
            buttonInterface={convertObjectToButtonInterface({
              shape: "round",
              background: "blue",
              color: "white",
              hasBorder: false,
              height: 36,
              fontSize: 14,
            })}
          >
            회원가입
          </Button>
        </>
      )}
    </header>
  );
};

export default Header;
