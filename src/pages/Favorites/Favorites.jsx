import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FavoritesDataContext } from "../../context/ContextProvider";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Btn from "../../components/UIkit/Btn/Btn";
import EmptyState from "../../components/UIkit/EmptyState/EmptyState";
import PageHero from "../../components/UIkit/PageHero/PageHero";
import s from "./Favorites.module.scss";

function Favorites() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { favorites } = useContext(FavoritesDataContext);

  if (favorites.length === 0) {
    return (
      <EmptyState
        title={t("favoritesPage.emptyTitle")}
        text={t("favoritesPage.emptyText")}
        action={
          <Btn color="primary" onClickFunc={() => navigate("/products")}>
            {t("favoritesPage.shoppingCta")}
          </Btn>
        }
      />
    );
  }

  return (
    <div className={s.root}>
      <PageHero
        eyebrow={t("favoritesPage.eyebrow")}
        title={t("favoritesPage.title")}
        aside={
          <span className={s.count}>
            {t("commonItemsCount", { count: favorites.length })}
          </span>
        }
      />
      <ProductGrid products={favorites} />
    </div>
  );
}

export default Favorites;
