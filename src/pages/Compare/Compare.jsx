import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CompareActionsContext,
  CompareDataContext,
} from "../../context/ContextProvider";
import Btn from "../../components/UIkit/Btn/Btn";
import EmptyState from "../../components/UIkit/EmptyState/EmptyState";
import PageHero from "../../components/UIkit/PageHero/PageHero";
import s from "./Compare.module.scss";

const getPrice = (product) =>
  product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

function Compare() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { compareItems } = useContext(CompareDataContext);
  const { clearCompare } = useContext(CompareActionsContext);

  if (compareItems.length === 0) {
    return (
      <EmptyState
        title={t("comparePage.emptyTitle")}
        text={t("comparePage.emptyText")}
        action={
          <Btn color="primary" onClickFunc={() => navigate("/products")}>
            {t("commonCatalogCta")}
          </Btn>
        }
      />
    );
  }

  return (
    <div className={s.root}>
      <PageHero
        eyebrow={t("comparePage.limit")}
        title={t("comparePage.title")}
        action={
          <Btn color="secondary" onClickFunc={clearCompare}>
            {t("comparePage.clear")}
          </Btn>
        }
      />
      <div className={s.table}>
        <div className={s.row}>
          <div className={s.label}>{t("comparePage.product")}</div>
          {compareItems.map((product) => (
            <Link
              key={product.id}
              className={s.productHead}
              to={`/products/${product.category}/${product.id}`}
            >
              <img src={product.imgUrl} alt={product.title} />
              <strong>{product.title}</strong>
            </Link>
          ))}
        </div>
        <div className={s.row}>
          <div className={s.label}>{t("comparePage.price")}</div>
          {compareItems.map((product) => (
            <div key={product.id}>{getPrice(product)} {product.currency}</div>
          ))}
        </div>
        <div className={s.row}>
          <div className={s.label}>{t("comparePage.category")}</div>
          {compareItems.map((product) => (
            <div key={product.id}>
              {t(`categories.${product.category}`, {
                defaultValue: product.category,
              })}
            </div>
          ))}
        </div>
        <div className={s.row}>
          <div className={s.label}>{t("comparePage.specs")}</div>
          {compareItems.map((product) => (
            <div key={product.id}>{product.desc}</div>
          ))}
        </div>
        <div className={s.row}>
          <div className={s.label}>{t("comparePage.cashback")}</div>
          {compareItems.map((product) => (
            <div key={product.id}>
              {Math.max(5, Math.round(getPrice(product) * 0.03))} {product.currency}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Compare;
