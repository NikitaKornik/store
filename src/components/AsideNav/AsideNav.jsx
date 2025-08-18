import React from "react";
import s from "./AsideNav.module.scss";
import { Link } from "react-router-dom";

const catalog = ["Телефоны", "Гарнитуры", "Блоки питания", "Умные часы"];

function AsideNav() {
  return (
    <div className={s.root}>
      <Link className={s.logo}>
        <img src="/img/MobileLend.png" alt="Store Logo" />
      </Link>
      <div className={s.switchFilterCatalog}></div>
      <ul className={s.catalog}>
        {catalog.map((item, index) => {
          return (
            <li key={index} className={s.catalogItem}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AsideNav;
