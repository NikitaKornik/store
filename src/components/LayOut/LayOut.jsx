import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import s from "./LayOut.module.scss";

function LayOut({ children }) {
  return (
    <div className={s.root}>
      <Header />
      <div className={s.wrapper}>{children}</div>
      <Footer />
    </div>
  );
}

export default LayOut;
