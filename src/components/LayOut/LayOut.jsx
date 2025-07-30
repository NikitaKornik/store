import React from "react";
import s from "./LayOut.module.scss";
import Header from "../Header/Header";

function LayOut({ children }) {
  return (
    <div className={s.root}>
      <Header />
      {children}
    </div>
  );
}

export default LayOut;
