import React from "react";
import cn from "classnames";
import s from "./EmptyState.module.scss";

function EmptyState({ eyebrow, title, text, action, className }) {
  return (
    <section className={cn(s["empty-state"], className)}>
      {eyebrow && <span className={s["empty-state__eyebrow"]}>{eyebrow}</span>}
      <h1 className={s["empty-state__title"]}>{title}</h1>
      {text && <p className={s["empty-state__text"]}>{text}</p>}
      {action && <div className={s["empty-state__action"]}>{action}</div>}
    </section>
  );
}

export default EmptyState;
