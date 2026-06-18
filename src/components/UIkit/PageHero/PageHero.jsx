import React from "react";
import cn from "classnames";
import s from "./PageHero.module.scss";

function PageHero({ eyebrow, title, text, aside, action, className }) {
  return (
    <section className={cn(s["page-hero"], className)}>
      <div className={s["page-hero__content"]}>
        {eyebrow && <span className={s["page-hero__eyebrow"]}>{eyebrow}</span>}
        <h1 className={s["page-hero__title"]}>{title}</h1>
        {text && <p className={s["page-hero__text"]}>{text}</p>}
      </div>
      {(aside || action) && (
        <div className={s["page-hero__aside"]}>
          {aside}
          {action}
        </div>
      )}
    </section>
  );
}

export default PageHero;
