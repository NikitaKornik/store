import React from "react";
import { useTranslation } from "react-i18next";
import s from "./ServiceStrip.module.scss";

const services = [
  { titleKey: "deliveryTitle", textKey: "deliveryText" },
  { titleKey: "warrantyTitle", textKey: "warrantyText" },
  { titleKey: "checkTitle", textKey: "checkText" },
  { titleKey: "bonusTitle", textKey: "bonusText" },
];

function ServiceStrip() {
  const { t } = useTranslation();

  return (
    <section className={s.root}>
      {services.map((service, index) => (
        <div key={service.titleKey} className={s.item}>
          <span>{index + 1}</span>
          <div>
            <h3>{t(service.titleKey)}</h3>
            <p>{t(service.textKey)}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ServiceStrip;
