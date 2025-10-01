import React from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import { catalog } from "../../data/catalog";
import s from "./AsideNav.module.scss";

function AsideNav() {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const category = parts[2];
  return (
    <div className={s.root}>
      <Link to={""} className={s.logo}>
        <img src="/img/MobileLend.png" alt="Store Logo" />
      </Link>
      <div className={s.switchFilterCatalog}>
        <span className={cn(s.switchItem, s.active)}>Категории</span>
        {" | "}
        <span className={s.switchItem}>Фильтры</span>
      </div>
      <ul className={s.catalog}>
        {catalog.map((item, index) => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              to={"products/" + item.category}
            >
              <li
                key={index}
                className={cn(s.catalogItem, {
                  [s.active]: item.category === category,
                })}
              >
                {item.name}
              </li>
            </Link>
            /* <li
              key={index}
              className={cn(s.catalogItem, {
                [s.active]: item.category === category,
              })}
            >
              <Link to={"products/" + item.category}>{item.name}</Link>
            </li> */
          );
        })}
      </ul>
    </div>
  );
}

export default AsideNav;
