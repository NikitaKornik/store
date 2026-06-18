import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import s from "./PromoHighlights.module.scss";

const promos = [
  {
    title: "Trade-In",
    textKey: "tradeInText",
    accentKey: "promoUpTo20",
    to: "/products/smartphones",
  },
  {
    titleKey: "productCard.credit",
    textKey: "creditText",
    accent: "0%",
    to: "/products",
  },
  {
    titleKey: "cashback",
    textKey: "cashbackText",
    accent: "3%",
    to: "/products/headphones",
  },
];

function PromoHighlights() {
  const { t } = useTranslation();

  return (
    <section className={s.root}>
      {promos.map((promo) => (
        <Link key={promo.title || promo.titleKey} className={s.card} to={promo.to}>
          <span className={s.accent}>
            {promo.accentKey ? t(promo.accentKey) : promo.accent}
          </span>
          <div>
            <h3>{promo.titleKey ? t(promo.titleKey) : promo.title}</h3>
            <p>{t(promo.textKey)}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default PromoHighlights;
