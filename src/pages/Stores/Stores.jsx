import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/UIkit/PageHero/PageHero";
import s from "./Stores.module.scss";

const stores = [
  {
    id: 1,
    name: "MobileLend MallDova",
    address: "Chișinău, str. Arborilor 21",
    schedule: "10:00 - 22:00",
    statusKey: "open",
    phone: "+373 22 010 101",
  },
  {
    id: 2,
    name: "MobileLend Botanica",
    address: "Chișinău, bd. Dacia 49/6",
    schedule: "09:00 - 21:00",
    statusKey: "open",
    phone: "+373 22 020 202",
  },
  {
    id: 3,
    name: "MobileLend Bălți",
    address: "Bălți, str. Ștefan cel Mare 2",
    schedule: "10:00 - 20:00",
    statusKey: "closing",
    phone: "+373 23 030 303",
  },
];

const mapPlaces = [
  {
    label: "Chișinău Center",
    lat: 47.0245,
    lng: 28.8323,
  },
  {
    label: "Valea Morilor",
    lat: 47.0194,
    lng: 28.8086,
  },
  {
    label: "Bălți Center",
    lat: 47.7539,
    lng: 27.9184,
  },
  {
    label: "Orhei",
    lat: 47.3831,
    lng: 28.8231,
  },
];

function Stores() {
  const { t } = useTranslation();
  const randomPlace = useMemo(() => {
    const index = Math.floor(Math.random() * mapPlaces.length);
    return mapPlaces[index];
  }, []);
  const delta = 0.018;
  const bbox = [
    randomPlace.lng - delta,
    randomPlace.lat - delta,
    randomPlace.lng + delta,
    randomPlace.lat + delta,
  ].join(",");
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${randomPlace.lat},${randomPlace.lng}`;

  return (
    <div className={s.root}>
      <PageHero
        eyebrow={t("storesEyebrow")}
        title={t("storesTitle")}
        text={t("storesText")}
        aside={
          <div className={s.heroBadge}>
            <strong>{stores.length}</strong>
            <span>{t("pickupPoints")}</span>
          </div>
        }
      />

      <div className={s.content}>
        <section className={s.mapPanel}>
          <div className={s.mapHeader}>
            <div>
              <span>{t("randomPoint")}</span>
              <strong>{randomPlace.label}</strong>
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${randomPlace.lat}&mlon=${randomPlace.lng}#map=15/${randomPlace.lat}/${randomPlace.lng}`}
              target="_blank"
              rel="noreferrer"
            >
              {t("openMap")}
            </a>
          </div>
          <iframe
            className={s.map}
            src={mapSrc}
            title={t("storeStatuses.mapTitle", { place: randomPlace.label })}
            loading="lazy"
          />
        </section>

        <section className={s.storeList}>
          {stores.map((store) => (
            <article className={s.storeCard} key={store.id}>
              <div className={s.storeTop}>
                <h2>{store.name}</h2>
                <span>{t(`storeStatuses.${store.statusKey}`)}</span>
              </div>
              <p>{store.address}</p>
              <div className={s.storeMeta}>
                <div>
                  <span>{t("schedule")}</span>
                  <strong>{store.schedule}</strong>
                </div>
                <div>
                  <span>{t("phone")}</span>
                  <strong>{store.phone}</strong>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Stores;
