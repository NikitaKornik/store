import React from "react";
import { Link } from "react-router-dom";
import s from "./PromoHighlights.module.scss";

const promos = [
  {
    title: "Trade-In",
    text: "Сдайте старое устройство и получите скидку на новое.",
    accent: "до 20%",
    to: "/products/smartphones",
  },
  {
    title: "Кредит 0 | 0 | 6",
    text: "Покупайте сейчас, оплачивайте равными частями.",
    accent: "0%",
    to: "/products",
  },
  {
    title: "Кэшбэк",
    text: "Возвращайте бонусы за покупки техники и аксессуаров.",
    accent: "3%",
    to: "/products/headphones",
  },
];

function PromoHighlights() {
  return (
    <section className={s.root}>
      {promos.map((promo) => (
        <Link key={promo.title} className={s.card} to={promo.to}>
          <span className={s.accent}>{promo.accent}</span>
          <div>
            <h3>{promo.title}</h3>
            <p>{promo.text}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default PromoHighlights;
