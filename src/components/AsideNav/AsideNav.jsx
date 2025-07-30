import React from "react";
import s from "./AsideNav.module.scss";

function AsideNav() {
  return (
    <div className={s.root}>
      <div className={s.logo}>
        <img src="/img/Store_Logo.webp"></img>
      </div>
      <div className={s.switchFilterCatalog}></div>
      <div className={s.Catalog}></div>
    </div>
  );
}

export default AsideNav;
