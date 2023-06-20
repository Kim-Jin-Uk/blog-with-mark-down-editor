import React from "react";

const Nav = ({ items }: { items: string[] }) => {
  return (
    <nav>
      <ul className="nav-list">
        {items.map((item: string) => (
          <>
            <li className="nav-list-item" key={item}>
              <span className="nav-item-text">{item}</span>
              <div className="nav-under-bar"></div>
            </li>
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
