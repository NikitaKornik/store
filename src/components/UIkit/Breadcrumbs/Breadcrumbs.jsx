import React from "react";
import { products } from "../../../data/products";
import { Link, useLocation } from "react-router-dom";
import s from "./Breadcrumbs.module.scss";

function Breadcrumbs({ productPage = false }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  return (
    <nav className={s.root}>
      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <>
            {productPage ? (
              <span className={s.active} key={to}>
                {products[value - 1].title}
              </span>
            ) : (
              <span className={s.active} key={to}>
                {value}
              </span>
            )}
          </>
        ) : (
          <>
            <Link key={to} to={to} style={{ textDecoration: "none" }}>
              {value}
            </Link>
            <div className={s.line}></div>
          </>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
