import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import s from "./LayOut.module.scss";

function LayOut({ children, onMenuClick }) {
  return (
    <div className={s.root}>
      <ScrollReveal />
      <Header onMenuClick={onMenuClick} />
      <div className={s.wrapper}>{children}</div>
      <Footer />
    </div>
  );
}

export default LayOut;
