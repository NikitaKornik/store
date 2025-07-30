import React from "react";
import s from "./Header.module.scss";
import Btn from "../UIkit/Btn/Btn";

function Header() {
  return (
    <header className={s.root}>
      <Btn onClickFunc={() => console.log(1)}>Магазины</Btn>
      <div className={s.search}>search</div>
      <div className={s.btns}>btns</div>
    </header>
  );
}

export default Header;
