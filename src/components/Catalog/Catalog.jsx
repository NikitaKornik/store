import React, { useState } from "react";
import cn from "classnames";
import { catalog } from "../../data/catalog";
import s from "./Catalog.module.scss";
import { Link } from "react-router-dom";
import Btn from "../UIkit/Btn/Btn";
import { ReactComponent as ForwardSvg } from "../../assets/icons/forward.svg";
import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";

function Catalog() {
  const [catalogArray, setCatalogArray] = useState([
    catalog[catalog.length - 1],
    ...catalog,
    ...catalog.slice(0, -1),
  ]);
  const [translateX, setTranslateX] = useState(-200);
  const [transition, setTransition] = useState(0);
  const [animating, setAnimating] = useState(false);

  function handleClickForward() {
    if (animating) return;
    setAnimating(true);
    setTransition(2);
    setTranslateX(-400);

    setTimeout(() => {
      setTransition(0);
      setTranslateX(-200);
      setCatalogArray((prev) => {
        if (prev.length === 0) return prev;
        const first = prev[0];
        return [...prev.slice(1), first];
      });
      setAnimating(false);
    }, 200);
  }
  function handleClickBack() {
    if (animating) return;
    setAnimating(true);
    setTransition(2);
    setTranslateX(0);

    setTimeout(() => {
      setTransition(0);
      setTranslateX(-200);
      setCatalogArray((prev) => {
        if (prev.length === 0) return prev; // защита
        const last = prev[prev.length - 1];
        return [last, ...prev.slice(0, -1)];
      });
      setAnimating(false);
    }, 200);
  }

  return (
    <div className={s.root}>
      <Btn className={cn(s.btn, s.btnForward)} onClick={handleClickForward}>
        <ForwardSvg />
      </Btn>
      <Btn className={cn(s.btn, s.btnBack)} onClick={handleClickBack}>
        <BackSvg />
      </Btn>
      <h4 className={s.title}>Категории</h4>
      <div className={s.catalogWrapper}>
        <ul
          className={s.catalog}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `all 0.${transition}s`,
          }}
        >
          {catalogArray.map((item) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={"/products/" + item.category}
              >
                <li key={item.id} className={s.catalogItem}>
                  <div className={s.imgContainer}>
                    <img className={s.img} src={item.imgUrl}></img>
                  </div>
                  <div className={s.categoryName}>{item.name}</div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Catalog;
