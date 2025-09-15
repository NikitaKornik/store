import React from "react";
import s from "./Footer.module.scss";

function Footer() {
  return (
    <div className={s.root}>
      <div></div>
      <div className={s.info}>
        <div>
          <span className={s.name}>Интернет магазин</span>
          <ul className={s.ul}>
            <li>тел.: 222 22 22 22</li>
            <li>gmail@gmail.com</li>
          </ul>
        </div>
        <div>
          <span className={s.name}>Работа с клиентами</span>
          <ul className={s.ul}>
            <li>тел.: 222 22 22 22</li>
            <li>gmail@gmail.com</li>
          </ul>
        </div>
        <div>
          <span className={s.name}>Компания</span>
          <ul className={s.ul}>
            <li>О нас</li>
            <li>Контакты</li>
            <li>Магазины</li>
            <li>Tаланты</li>
            <li>Доставка и получение</li>
            <li>Отслеживание заказа</li>
            <li>Гарантия и сервис</li>
            <li>Политика возврата и обмена</li>
            <li>Политика конфиденциальности</li>
            <li>Cookies</li>
          </ul>
        </div>
        <div>
          <span className={s.name}>Новости</span>
          <ul className={s.ul}>
            <li>Lifehack</li>
            <li>Blog</li>
            <li>События</li>
          </ul>
        </div>
        <div>
          <span className={s.name}>Информация</span>
          <ul className={s.ul}>
            <li>Акции</li>
            <li>Клуб</li>
            <li>Trade-In</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
