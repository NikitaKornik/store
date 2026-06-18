import React, { useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AuthContext,
  CartMetaContext,
  CompareMetaContext,
  FavoritesDataContext,
  FavoritesMetaContext,
} from "../../context/ContextProvider";
import Btn from "../../components/UIkit/Btn/Btn";
import { products } from "../../data/products";
import s from "./Account.module.scss";

const recentOrders = [
  {
    id: "ML-24018",
    title: "Apple iPhone 17 Pro 256 ГБ Серебряный",
    statusKey: "ready",
    dateKey: "today",
    total: "1 439 $",
  },
  {
    id: "ML-23974",
    title: "Наушники Apple AirPods Pro 2 Белый",
    statusKey: "transit",
    dateKey: "yesterday",
    total: "257 $",
  },
  {
    id: "ML-23802",
    title: 'Apple MacBook Air 13.6" 2025 Sky Blue',
    statusKey: "done",
    dateKey: "june12",
    total: "1 499 $",
  },
];

const profileActions = [
  { labelKey: "myOrders", value: "12", to: "/account#orders" },
  { labelKey: "addresses", value: "2", to: "/account#addresses" },
  { labelKey: "warranty", value: "5", to: "/account#warranty" },
  { labelKey: "bonuses", value: "184 $", to: "/account#bonus" },
];

function Account() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { cartItemCount } = useContext(CartMetaContext);
  const { favorites } = useContext(FavoritesDataContext);
  const { favoritesCount } = useContext(FavoritesMetaContext);
  const { compareCount } = useContext(CompareMetaContext);
  const recommendations = [...favorites, ...products]
    .filter(
      (product, index, source) =>
        source.findIndex((item) => item.id === product.id) === index
    )
    .slice(0, 4);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "ML";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={s.root}>
      <section className={s.hero}>
        <div className={s.profileCard}>
          <div className={s.avatar}>{initials}</div>
          <div>
            <span>{t("accountPage.title")}</span>
            <h1>{t("accountPage.welcome", { name: user?.name })}</h1>
            <p>{t("accountPage.text")}</p>
            <div className={s.profileMeta}>
              <span>{user?.email}</span>
              {user?.phone && <span>{user.phone}</span>}
            </div>
          </div>
        </div>
        <div className={s.bonusCard}>
          <span>MobileLend Club</span>
          <strong>184 $</strong>
          <p>{t("accountPage.bonusesAvailable")}</p>
          <div className={s.bonusActions}>
            <Btn color="primary" onClickFunc={() => navigate("/products")}>
              {t("accountPage.spend")}
            </Btn>
            <Btn color="secondary" onClickFunc={handleLogout}>
              {t("accountPage.logout")}
            </Btn>
          </div>
        </div>
      </section>

      <section className={s.metrics}>
        <Link to="/cart">
          <span>{t("accountPage.inCart")}</span>
          <strong>{cartItemCount}</strong>
        </Link>
        <Link to="/favorites">
          <span>{t("accountPage.favorites")}</span>
          <strong>{favoritesCount}</strong>
        </Link>
        <Link to="/compare">
          <span>{t("accountPage.compare")}</span>
          <strong>{compareCount}</strong>
        </Link>
        <Link to="/stores">
          <span>{t("accountPage.pickup")}</span>
          <strong>2 ч</strong>
        </Link>
      </section>

      <div className={s.content}>
        <section className={s.panel} id="orders">
          <div className={s.panelHeader}>
            <div>
              <span>{t("accountPage.history")}</span>
              <h2>{t("accountPage.recentOrders")}</h2>
            </div>
            <Btn color="secondary" onClickFunc={() => navigate("/products")}>
              {t("accountPage.newOrder")}
            </Btn>
          </div>
          <div className={s.orderList}>
            {recentOrders.map((order) => (
              <article className={s.orderCard} key={order.id}>
                <div>
                  <span>{order.id}</span>
                  <h3>{order.title}</h3>
                  <p>{t(`accountPage.${order.dateKey}`)}</p>
                </div>
                <div>
                  <strong>{order.total}</strong>
                  <em>{t(`accountPage.${order.statusKey}`)}</em>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className={s.sidePanel}>
          <section className={s.panel} id="bonus">
            <div className={s.panelHeaderCompact}>
              <span>{t("accountPage.profile")}</span>
              <h2>{t("accountPage.quickSections")}</h2>
            </div>
            <div className={s.actionGrid}>
              {profileActions.map((action) => (
                <Link to={action.to} key={action.labelKey}>
                  <span>{t(`accountPage.${action.labelKey}`)}</span>
                  <strong>{action.value}</strong>
                </Link>
              ))}
            </div>
          </section>

          <section className={s.panel} id="addresses">
            <div className={s.panelHeaderCompact}>
              <span>{t("accountPage.mainAddress")}</span>
              <h2>Chisinau, Botanica</h2>
            </div>
            <p className={s.muted}>{t("accountPage.addressText")}</p>
          </section>
        </aside>
      </div>

      <section className={s.panel} id="warranty">
        <div className={s.panelHeader}>
          <div>
            <span>{t("accountPage.picks")}</span>
            <h2>{t("accountPage.forYou")}</h2>
          </div>
          <Link className={s.textLink} to="/products">
            {t("accountPage.viewCatalog")}
          </Link>
        </div>
        <div className={s.recommendations}>
          {recommendations.map((product) => (
            <Link
              className={s.recommendation}
              key={product.id}
              to={`/products/${product.category}/${product.id}`}
            >
              <img src={product.imgUrl} alt={product.title} />
              <div>
                <strong>{product.title}</strong>
                <span>{product.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Account;
