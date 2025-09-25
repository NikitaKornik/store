import React from "react";
import { brands } from "../../data/brands";
import s from "./BrandList.module.scss";

function BrandList() {
  const speed = 50;
  return (
    <div className={s.root}>
      <ul
        className={s.BrandsWrapper}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...brands, ...brands].map((item) => {
          return (
            <li key={item.id}>
              <img className={s.img} src={item.imgUrl} alt={item.title} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BrandList;
