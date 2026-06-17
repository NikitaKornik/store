import React, { useMemo, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { catalog } from "../../data/catalog";
import Btn from "../UIkit/Btn/Btn";
import s from "./Catalog.module.scss";
import { ReactComponent as ForwardSvg } from "../../assets/icons/forward.svg";
import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";

function Catalog() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const carouselItems = useMemo(() => {
    const firstItem = catalog[0];
    const lastItem = catalog[catalog.length - 1];

    return [lastItem, ...catalog, firstItem];
  }, []);

  const scrollCatalog = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setWithTransition(true);
    setActiveIndex((currentIndex) => currentIndex + direction);
  };

  const unlockAfterReset = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setWithTransition(true);
        setIsAnimating(false);
      });
    });
  };

  const handleTransitionEnd = () => {
    const firstRealIndex = 1;
    const lastRealIndex = carouselItems.length - 2;
    const endCloneIndex = carouselItems.length - 1;

    if (activeIndex === endCloneIndex) {
      setWithTransition(false);
      setActiveIndex(firstRealIndex);
      unlockAfterReset();
      return;
    }

    if (activeIndex === 0) {
      setWithTransition(false);
      setActiveIndex(lastRealIndex);
      unlockAfterReset();
      return;
    }

    setIsAnimating(false);
  };

  const getItemKey = (item, index) => {
    if (index === 0) return `${item.id}-clone-start`;
    if (index === carouselItems.length - 1) return `${item.id}-clone-end`;
    return item.id;
  };

  return (
    <div className={s.root}>
      <h4 className={s.title}>Категории</h4>
      <div className={s.slider}>
        <Btn
          className={cn(s.btn, s.btnBack)}
          onClick={() => scrollCatalog(-1)}
          aria-label="Предыдущая категория"
        >
          <BackSvg />
        </Btn>
        <div className={s.catalogWrapper}>
          <ul
            className={s.catalog}
            style={{
              "--active-index": activeIndex,
              transition: withTransition
                ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {carouselItems.map((item, index) => (
              <Link
                key={getItemKey(item, index)}
                className={s.catalogLink}
                to={"/products/" + item.category}
              >
                <li className={s.catalogItem}>
                  <div className={s.imgContainer}>
                    <img className={s.img} src={item.imgUrl} alt={item.name} />
                  </div>
                  <div className={s.categoryName}>{item.name}</div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <Btn
          className={cn(s.btn, s.btnForward)}
          onClick={() => scrollCatalog(1)}
          aria-label="Следующая категория"
        >
          <ForwardSvg />
        </Btn>
      </div>
    </div>
  );
}

export default Catalog;
