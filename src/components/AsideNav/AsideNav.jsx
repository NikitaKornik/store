import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import s from "./AsideNav.module.scss";

const menuItems = [
  {
    id: "catalog",
    icon: "CT",
    name: "Каталог",
    category: "smartphones",
    columns: [
      {
        title: "Популярное",
        links: [
          { label: "Смартфоны", to: "/products/smartphones" },
          { label: "Планшеты", to: "/products/tablets" },
          { label: "Ноутбуки", to: "/products/laptops" },
          { label: "Гарнитуры", to: "/products/headphones" },
        ],
      },
      {
        title: "Сервисы",
        links: [
          { label: "Магазины", to: "/stores" },
          { label: "Избранное", to: "/favorites" },
          { label: "Сравнение", to: "/compare" },
        ],
      },
    ],
  },
  {
    id: "apple",
    icon: "AP",
    name: "Apple",
    category: "smartphones",
    columns: [
      {
        title: "iPhone",
        links: [
          { label: "iPhone 15 Pro", to: "/products/smartphones/1", badge: "hit" },
          { label: "iPhone 15", to: "/products/smartphones/2" },
          { label: "iPhone 14 Plus", to: "/products/smartphones/3" },
          { label: "iPhone 13", to: "/products/smartphones/14" },
          { label: "iPhone SE", to: "/products/smartphones/20" },
        ],
      },
      {
        title: "Apple Watch",
        links: [
          { label: "Apple Watch Ultra", to: "/products/smartwatches" },
          { label: "Apple Watch Series", to: "/products/smartwatches" },
          { label: "Ремешки", to: "/products/smartwatches" },
        ],
      },
      {
        title: "Mac и iPad",
        links: [
          { label: "MacBook Pro", to: "/products/laptops" },
          { label: "MacBook Air", to: "/products/laptops" },
          { label: "iPad Air", to: "/products/tablets" },
          { label: "iPad Pro", to: "/products/tablets" },
        ],
      },
      {
        title: "AirPods и аксессуары",
        links: [
          { label: "AirPods Pro", to: "/products/headphones" },
          { label: "AirPods Max", to: "/products/headphones" },
          { label: "Зарядные устройства", to: "/products/headphones" },
          { label: "Кабели", to: "/products/headphones" },
        ],
      },
    ],
  },
  {
    id: "phones",
    icon: "PH",
    name: "Телефоны | Планшеты",
    category: "smartphones",
    columns: [
      {
        title: "Смартфоны",
        links: [
          { label: "Apple", to: "/products/smartphones" },
          { label: "Samsung", to: "/products/smartphones" },
          { label: "Xiaomi", to: "/products/smartphones" },
          { label: "Google Pixel", to: "/products/smartphones" },
          { label: "OnePlus", to: "/products/smartphones" },
          { label: "Realme", to: "/products/smartphones" },
          { label: "до 500 $", to: "/products/smartphones" },
          { label: "500 - 1000 $", to: "/products/smartphones" },
          { label: "более 1000 $", to: "/products/smartphones" },
        ],
      },
      {
        title: "Планшеты",
        links: [
          { label: "Apple", to: "/products/tablets" },
          { label: "Samsung", to: "/products/tablets" },
          { label: "Xiaomi", to: "/products/tablets" },
          { label: "Lenovo", to: "/products/tablets" },
        ],
      },
      {
        title: "Классические телефоны",
        links: [
          { label: "Dual SIM", to: "/products/smartphones" },
          { label: "Телефоны DECT", to: "/products/smartphones" },
          { label: "Защищенные телефоны", to: "/products/smartphones" },
        ],
      },
      {
        title: "Аксессуары",
        links: [
          { label: "Зарядные устройства", to: "/products/headphones" },
          { label: "Защитные стекла", to: "/products/smartphones" },
          { label: "Кабели для телефонов", to: "/products/smartphones" },
          { label: "Чехлы для смартфонов", to: "/products/smartphones" },
          { label: "Power Bank", to: "/products/smartphones" },
          { label: "Наушники", to: "/products/headphones" },
          { label: "Стилусы", to: "/products/tablets" },
        ],
      },
    ],
  },
  {
    id: "pc",
    icon: "PC",
    name: "Ноутбуки | ПК",
    category: "laptops",
    columns: [
      {
        title: "Ноутбуки",
        links: [
          { label: "MacBook", to: "/products/laptops" },
          { label: "Игровые ноутбуки", to: "/products/laptops", badge: "new" },
          { label: "Ультрабуки", to: "/products/laptops" },
          { label: "Для работы", to: "/products/laptops" },
        ],
      },
      {
        title: "Мониторы и ПК",
        links: [
          { label: "Мониторы Full HD", to: "/products/laptops" },
          { label: "Мониторы 4K", to: "/products/laptops" },
          { label: "Системные блоки", to: "/products/laptops" },
          { label: "Моноблоки", to: "/products/laptops" },
        ],
      },
      {
        title: "Периферия",
        links: [
          { label: "Клавиатуры", to: "/products/laptops" },
          { label: "Мышки", to: "/products/laptops" },
          { label: "WEB-камеры", to: "/products/cameras" },
          { label: "Внешние SSD", to: "/products/laptops" },
        ],
      },
      {
        title: "Сеть",
        links: [
          { label: "Роутеры", to: "/products/laptops" },
          { label: "Сетевые адаптеры", to: "/products/laptops" },
          { label: "NAS", to: "/products/laptops" },
        ],
      },
    ],
  },
  {
    id: "gaming",
    icon: "GM",
    name: "Гейминг",
    category: "playstaions",
    columns: [
      {
        title: "Игровые приставки",
        links: [
          { label: "Sony PlayStation", to: "/products/playstaions" },
          { label: "Microsoft Xbox", to: "/products/playstaions" },
          { label: "Nintendo", to: "/products/playstaions" },
          { label: "PlayStation 5", to: "/products/playstaions", badge: "hit" },
        ],
      },
      {
        title: "Игровая периферия",
        links: [
          { label: "Геймпады", to: "/products/playstaions" },
          { label: "Наушники", to: "/products/headphones" },
          { label: "Клавиатуры", to: "/products/laptops" },
          { label: "Мыши", to: "/products/laptops" },
        ],
      },
      {
        title: "Игры",
        links: [
          { label: "для PlayStation", to: "/products/playstaions" },
          { label: "для Xbox", to: "/products/playstaions" },
          { label: "для Nintendo", to: "/products/playstaions" },
        ],
      },
    ],
  },
  {
    id: "watches",
    icon: "SW",
    name: "Умные часы | Браслеты",
    category: "smartwatches",
    columns: [
      {
        title: "Умные часы",
        links: [
          { label: "Apple Watch", to: "/products/smartwatches" },
          { label: "Samsung Watch", to: "/products/smartwatches" },
          { label: "Garmin", to: "/products/smartwatches" },
          { label: "Xiaomi", to: "/products/smartwatches" },
        ],
      },
      {
        title: "Функции",
        links: [
          { label: "Часы с NFC", to: "/products/smartwatches" },
          { label: "SpO2", to: "/products/smartwatches" },
          { label: "GPS", to: "/products/smartwatches" },
          { label: "Для детей", to: "/products/smartwatches" },
        ],
      },
      {
        title: "Аксессуары",
        links: [
          { label: "Ремешки", to: "/products/smartwatches" },
          { label: "Защитные стекла", to: "/products/smartwatches" },
          { label: "Зарядные кабели", to: "/products/smartwatches" },
        ],
      },
    ],
  },
  {
    id: "home",
    icon: "HO",
    name: "Дом | Офис",
    category: "cameras",
    columns: [
      {
        title: "Умный дом",
        links: [
          { label: "Камеры наблюдения", to: "/products/cameras" },
          { label: "Датчики", to: "/products/cameras" },
          { label: "Освещение", to: "/products/cameras" },
          { label: "Роботы-пылесосы", to: "/products/cameras" },
        ],
      },
      {
        title: "Офис",
        links: [
          { label: "Принтеры", to: "/products/laptops" },
          { label: "Сканеры", to: "/products/cameras" },
          { label: "МФУ", to: "/products/laptops" },
          { label: "Расходники", to: "/products/laptops" },
        ],
      },
      {
        title: "Аксессуары",
        links: [
          { label: "Удлинители", to: "/products/laptops" },
          { label: "Батарейки", to: "/products/laptops" },
          { label: "Сумки-органайзеры", to: "/products/laptops" },
        ],
      },
    ],
  },
  {
    id: "photo",
    icon: "CM",
    name: "Фото | Видео | Влоги",
    category: "cameras",
    columns: [
      {
        title: "Камеры",
        links: [
          { label: "Canon", to: "/products/cameras" },
          { label: "Sony", to: "/products/cameras" },
          { label: "Компактные камеры", to: "/products/cameras" },
          { label: "4K камеры", to: "/products/cameras" },
        ],
      },
      {
        title: "Для блогов",
        links: [
          { label: "Штативы", to: "/products/cameras" },
          { label: "Селфи палки", to: "/products/cameras" },
          { label: "Кольцевые лампы", to: "/products/cameras" },
          { label: "Микрофоны", to: "/products/headphones" },
        ],
      },
    ],
  },
  {
    id: "audio",
    icon: "AU",
    name: "Аудио | ТВ | Мультимедиа",
    category: "headphones",
    columns: [
      {
        title: "Аудио",
        links: [
          { label: "Наушники", to: "/products/headphones" },
          { label: "TWS", to: "/products/headphones" },
          { label: "ANC модели", to: "/products/headphones" },
          { label: "Колонки", to: "/products/headphones" },
        ],
      },
      {
        title: "Мультимедиа",
        links: [
          { label: "Smart TV", to: "/products/headphones" },
          { label: "Apple TV", to: "/products/headphones" },
          { label: "HDMI кабели", to: "/products/headphones" },
        ],
      },
    ],
  },
];

const menuTextTranslations = {
  ro: {
    "Каталог": "Catalog",
    "Популярное": "Populare",
    "Сервисы": "Servicii",
    "Магазины": "Magazine",
    "Избранное": "Favorite",
    "Сравнение": "Comparatie",
    "Телефоны | Планшеты": "Telefoane | Tablete",
    "Смартфоны": "Smartphone-uri",
    "Планшеты": "Tablete",
    "Гарнитуры": "Casti",
    "Классические телефоны": "Telefoane clasice",
    "Телефоны DECT": "Telefoane DECT",
    "Защищенные телефоны": "Telefoane rezistente",
    "Аксессуары": "Accesorii",
    "Зарядные устройства": "Incarcatoare",
    "Защитные стекла": "Sticle de protectie",
    "Кабели для телефонов": "Cabluri pentru telefoane",
    "Чехлы для смартфонов": "Huse pentru smartphone-uri",
    "до 500 $": "pana la 500 $",
    "более 1000 $": "peste 1000 $",
    "Наушники": "Casti",
    "Стилусы": "Stylusuri",
    "Ноутбуки | ПК": "Laptopuri | PC",
    "Ноутбуки": "Laptopuri",
    "Игровые ноутбуки": "Laptopuri gaming",
    "Ультрабуки": "Ultrabook-uri",
    "Для работы": "Pentru lucru",
    "Мониторы и ПК": "Monitoare si PC",
    "Мониторы Full HD": "Monitoare Full HD",
    "Мониторы 4K": "Monitoare 4K",
    "Системные блоки": "Desktop PC",
    "Моноблоки": "All-in-one",
    "Периферия": "Periferice",
    "Клавиатуры": "Tastaturi",
    "Мышки": "Mouse-uri",
    "Внешние SSD": "SSD externe",
    "Сеть": "Retea",
    "Роутеры": "Routere",
    "Сетевые адаптеры": "Adaptoare retea",
    "Гейминг": "Gaming",
    "Игровые приставки": "Console gaming",
    "Игровая периферия": "Periferice gaming",
    "Геймпады": "Gamepad-uri",
    "Мыши": "Mouse-uri",
    "Игры": "Jocuri",
    "для PlayStation": "pentru PlayStation",
    "для Xbox": "pentru Xbox",
    "для Nintendo": "pentru Nintendo",
    "Умные часы | Браслеты": "Ceasuri smart | Bratari",
    "Умные часы": "Ceasuri smart",
    "Функции": "Functii",
    "Часы с NFC": "Ceasuri cu NFC",
    "Для детей": "Pentru copii",
    "Ремешки": "Curele",
    "Зарядные кабели": "Cabluri de incarcare",
    "Дом | Офис": "Casa | Birou",
    "Умный дом": "Casa smart",
    "Камеры наблюдения": "Camere supraveghere",
    "Датчики": "Senzori",
    "Освещение": "Iluminare",
    "Роботы-пылесосы": "Aspiratoare robot",
    "Офис": "Birou",
    "Принтеры": "Imprimante",
    "Сканеры": "Scanere",
    "МФУ": "Multifunctionale",
    "Расходники": "Consumabile",
    "Удлинители": "Prelungitoare",
    "Батарейки": "Baterii",
    "Сумки-органайзеры": "Genti organizatoare",
    "Фото | Видео | Влоги": "Foto | Video | Vloguri",
    "Камеры": "Camere",
    "Компактные камеры": "Camere compacte",
    "Для блогов": "Pentru vloguri",
    "Штативы": "Trepiede",
    "Селфи палки": "Selfie stick-uri",
    "Кольцевые лампы": "Lampi circulare",
    "Микрофоны": "Microfoane",
    "Аудио | ТВ | Мультимедиа": "Audio | TV | Multimedia",
    "Аудио": "Audio",
    "Колонки": "Boxe",
    "Мультимедиа": "Multimedia",
  },
  en: {
    "Каталог": "Catalog",
    "Популярное": "Popular",
    "Сервисы": "Services",
    "Магазины": "Stores",
    "Избранное": "Favorites",
    "Сравнение": "Compare",
    "Телефоны | Планшеты": "Phones | Tablets",
    "Смартфоны": "Smartphones",
    "Планшеты": "Tablets",
    "Гарнитуры": "Headsets",
    "Классические телефоны": "Classic phones",
    "Телефоны DECT": "DECT phones",
    "Защищенные телефоны": "Rugged phones",
    "Аксессуары": "Accessories",
    "Зарядные устройства": "Chargers",
    "Защитные стекла": "Screen protectors",
    "Кабели для телефонов": "Phone cables",
    "Чехлы для смартфонов": "Smartphone cases",
    "до 500 $": "up to $500",
    "более 1000 $": "over $1000",
    "Наушники": "Headphones",
    "Стилусы": "Styluses",
    "Ноутбуки | ПК": "Laptops | PCs",
    "Ноутбуки": "Laptops",
    "Игровые ноутбуки": "Gaming laptops",
    "Ультрабуки": "Ultrabooks",
    "Для работы": "For work",
    "Мониторы и ПК": "Monitors and PCs",
    "Мониторы Full HD": "Full HD monitors",
    "Мониторы 4K": "4K monitors",
    "Системные блоки": "Desktop towers",
    "Моноблоки": "All-in-one PCs",
    "Периферия": "Peripherals",
    "Клавиатуры": "Keyboards",
    "Мышки": "Mice",
    "Внешние SSD": "External SSDs",
    "Сеть": "Network",
    "Роутеры": "Routers",
    "Сетевые адаптеры": "Network adapters",
    "Гейминг": "Gaming",
    "Игровые приставки": "Game consoles",
    "Игровая периферия": "Gaming peripherals",
    "Геймпады": "Gamepads",
    "Мыши": "Mice",
    "Игры": "Games",
    "для PlayStation": "for PlayStation",
    "для Xbox": "for Xbox",
    "для Nintendo": "for Nintendo",
    "Умные часы | Браслеты": "Smart watches | Bands",
    "Умные часы": "Smart watches",
    "Функции": "Features",
    "Часы с NFC": "Watches with NFC",
    "Для детей": "For kids",
    "Ремешки": "Bands",
    "Зарядные кабели": "Charging cables",
    "Дом | Офис": "Home | Office",
    "Умный дом": "Smart home",
    "Камеры наблюдения": "Security cameras",
    "Датчики": "Sensors",
    "Освещение": "Lighting",
    "Роботы-пылесосы": "Robot vacuums",
    "Офис": "Office",
    "Принтеры": "Printers",
    "Сканеры": "Scanners",
    "МФУ": "MFPs",
    "Расходники": "Consumables",
    "Удлинители": "Extension cords",
    "Батарейки": "Batteries",
    "Сумки-органайзеры": "Organizer bags",
    "Фото | Видео | Влоги": "Photo | Video | Vlogs",
    "Камеры": "Cameras",
    "Компактные камеры": "Compact cameras",
    "Для блогов": "For vlogs",
    "Штативы": "Tripods",
    "Селфи палки": "Selfie sticks",
    "Кольцевые лампы": "Ring lights",
    "Микрофоны": "Microphones",
    "Аудио | ТВ | Мультимедиа": "Audio | TV | Multimedia",
    "Аудио": "Audio",
    "Колонки": "Speakers",
    "Мультимедиа": "Multimedia",
  },
};

function AsideNav({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const category = parts[2];
  const initialItem = useMemo(
    () => menuItems.find((item) => item.category === category) || menuItems[2],
    [category]
  );
  const [activeId, setActiveId] = useState(initialItem.id);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [isFlyoutClosed, setIsFlyoutClosed] = useState(false);
  const activeItem = menuItems.find((item) => item.id === activeId) || initialItem;
  const menuLanguage = i18n.language?.split("-")[0];
  const translateMenuText = (text) =>
    menuTextTranslations[menuLanguage]?.[text] || text;

  useEffect(() => {
    setActiveId(initialItem.id);
    setIsFlyoutOpen(false);
  }, [initialItem.id]);

  const handleMenuSelect = () => {
    setIsFlyoutOpen(false);
    setIsFlyoutClosed(true);
    onClose();
  };

  const handleFlyoutClose = () => {
    setIsFlyoutOpen(false);
  };

  return (
    <>
      <button
        className={cn(s.backdrop, { [s.open]: isOpen })}
        type="button"
        onClick={onClose}
        aria-label={t("closeMenu")}
      />
      <div
        className={cn(s.root, {
          [s.open]: isOpen,
          [s.flyoutOpen]: isFlyoutOpen,
          [s.flyoutClosed]: isFlyoutClosed,
        })}
        onMouseLeave={handleFlyoutClose}
      >
        <Link
          to={""}
          className={s.logo}
          onClick={handleMenuSelect}
          onMouseEnter={handleFlyoutClose}
          onFocus={handleFlyoutClose}
        >
          <img src="/img/MobileLend.svg" alt="MobileLend" />
        </Link>
        <div
          className={s.catalogTitle}
          onMouseEnter={handleFlyoutClose}
        >
          <span className={s.gridIcon} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>{t("catalog")}</span>
        </div>
        <ul className={s.catalog}>
          {menuItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li
                key={item.id}
                className={cn(s.catalogItem, {
                  [s.active]: isActive,
                })}
                onMouseEnter={() => {
                  setActiveId(item.id);
                  setIsFlyoutOpen(true);
                  setIsFlyoutClosed(false);
                }}
                onFocus={() => {
                  setActiveId(item.id);
                  setIsFlyoutOpen(true);
                  setIsFlyoutClosed(false);
                }}
              >
                <Link
                  className={s.catalogLink}
                  to={`/products/${item.category}`}
                  onClick={handleMenuSelect}
                >
                  <span className={s.categoryIcon}>{item.icon}</span>
                  <span className={s.itemName}>
                    {translateMenuText(item.name)}
                  </span>
                  <span className={s.chevron}>›</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div
          className={s.flyout}
          onMouseEnter={() => setIsFlyoutOpen(true)}
        >
          <div className={s.flyoutHeader}>
            <div>
              <span className={s.categoryIcon}>{activeItem.icon}</span>
              <strong>{translateMenuText(activeItem.name)}</strong>
            </div>
            <Link
              className={s.viewAll}
              to={`/products/${activeItem.category}`}
              onClick={handleMenuSelect}
            >
              {t("viewAll")}
            </Link>
          </div>
          <div className={s.flyoutGrid}>
            {activeItem.columns.map((column) => (
              <div className={s.flyoutColumn} key={column.title}>
                <h3>{translateMenuText(column.title)}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link to={link.to} onClick={handleMenuSelect}>
                        {translateMenuText(link.label)}
                        {link.badge && <span>{link.badge}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AsideNav;
