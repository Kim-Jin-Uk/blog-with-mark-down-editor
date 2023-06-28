import React from "react";
import Button from "../Button";
import { convertObjectToButtonInterface } from "../Button/utils";

const NavWithButton = ({
  itemsMap,
  selectedIndex,
  setSelectedIndex,
}: {
  itemsMap: Map<string, string>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <nav>
      <ul>
        {Array.from(itemsMap.keys()).map((item, idx) => (
          <li style={{ padding: 4 }} key={item}>
            <Button
              buttonInterface={convertObjectToButtonInterface({
                shape: "round",
                background: "blue",
                color: "white",
                hasBorder: false,
                height: 32,
                width: 172,
                fontSize: 16,
                align: "left",
                isNotActive: idx !== selectedIndex,
              })}
              svg={itemsMap.get(item)}
              onClick={() => setSelectedIndex(idx)}
            >
              {item}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavWithButton;
