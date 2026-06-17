import React from "react";
import s from "./ServiceStrip.module.scss";

const services = [
  { title: "Доставка по стране", text: "Быстро до двери или в ближайший пункт" },
  { title: "24 месяца гарантии", text: "Официальная поддержка и сервис" },
  { title: "Проверка в магазине", text: "Заберите после теста и консультации" },
  { title: "Бонусы за покупку", text: "Кэшбэк возвращается на следующие заказы" },
];

function ServiceStrip() {
  return (
    <section className={s.root}>
      {services.map((service, index) => (
        <div key={service.title} className={s.item}>
          <span>{index + 1}</span>
          <div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ServiceStrip;
