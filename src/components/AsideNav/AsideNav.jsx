import React from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import { catalog } from "../../data/catalog";
import s from "./AsideNav.module.scss";

function AsideNav({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const category = parts[2];
  return (
    <>
      <button
        className={cn(s.backdrop, { [s.open]: isOpen })}
        type="button"
        onClick={onClose}
        aria-label="Закрыть меню"
      />
      <div className={cn(s.root, { [s.open]: isOpen })}>
        <Link to={""} className={s.logo} onClick={onClose}>
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
                key={item.id}
                style={{ textDecoration: "none" }}
                to={"products/" + item.category}
                onClick={onClose}
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
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default AsideNav;
