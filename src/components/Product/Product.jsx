import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../../hooks/useAPI";
import {
  CartActionsContext,
  CompareActionsContext,
  FavoritesActionsContext,
} from "../../context/ContextProvider";
import { useIsCompared, useIsFavorite } from "../../context/selectionStores";
import Btn from "../UIkit/Btn/Btn";
import s from "./Product.module.scss";
import { ReactComponent as ShoppingCartSvg } from "../../assets/icons/shoppingCart.svg";
import { ReactComponent as HeartSvg } from "../../assets/icons/heart.svg";

function Product({
  imgUrl,
  title,
  desc,
  price,
  currency,
  discount,
  id,
  category,
}) {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { getCart } = useContext(CartActionsContext);
  const { toggleFavorite } = useContext(FavoritesActionsContext);
  const { toggleCompare } = useContext(CompareActionsContext);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const isFavorite = useIsFavorite(id);
  const isCompared = useIsCompared(id);
  const productPayload = useMemo(
    () => ({
      id,
      category,
      imgUrl,
      title,
      desc,
      price,
      currency,
      discount,
    }),
    [category, currency, desc, discount, id, imgUrl, price, title]
  );

  const handleAddToCart = useCallback(async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(id, 1);
      await getCart();
    } catch (err) {
      console.error("Ошибка при добавлении в корзину:", err);
    } finally {
      setIsAddingToCart(false);
    }
  }, [addToCart, getCart, id]);

  const handleFavoriteClick = useCallback(async () => {
    try {
      await toggleFavorite(id);
    } catch (err) {
      console.error("Ошибка при обновлении избранного:", err);
    }
  }, [id, toggleFavorite]);

  const handleCompareClick = useCallback(() => {
    toggleCompare(productPayload);
  }, [productPayload, toggleCompare]);

  const currentPrice = useMemo(
    () => (discount ? Math.round(price * (1 - discount / 100)) : price),
    [discount, price]
  );
  const cashback = useMemo(
    () => Math.max(5, Math.round(currentPrice * 0.03)),
    [currentPrice]
  );

  return (
    <div className={s.root}>
      <div className={s.cardTop}>
        {discount && <div className={s.discountBadge}>{`-${discount}%`}</div>}
        <button
          className={`${s.favoriteBtn} ${isFavorite ? s.favoriteBtnActive : ""}`}
          type="button"
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite
              ? t("productCard.removeFavorite")
              : t("productCard.addFavorite")
          }
          aria-pressed={isFavorite}
        >
          <HeartSvg />
        </button>
      </div>
      <Link className={s.imageLink} to={`/products/${category}/${id}`}>
        <div className={s.imgContainer}>
          <img className={s.img} src={imgUrl} alt={title} />
        </div>
      </Link>
      <div className={s.infoContainer}>
        <div className={s.metaRow}>
          <span>{t(`categories.${category}`, { defaultValue: category })}</span>
          {discount && <span>{t("productCard.week")}</span>}
        </div>
        <div className={s.title}>
          <Link to={`/products/${category}/${id}`}>{title}</Link>
        </div>

        <div className={s.desc}>{desc}</div>
        <div className={s.benefits}>
          <span>{t("productCard.cashback", { amount: cashback, currency })}</span>
          <span>{t("productCard.credit")}</span>
        </div>
        <button
          className={`${s.compareBtn} ${isCompared ? s.compareBtnActive : ""}`}
          type="button"
          onClick={handleCompareClick}
        >
          {isCompared ? t("productCard.inCompare") : t("productCard.compare")}
        </button>
        <div className={s.priceAndBtn}>
          <div className={s.priceContainer}>
            {discount && (
              <div className={s.priceWithoutDiscount}>{`${price}\u00A0${currency}`}</div>
            )}
            <div className={s.currentPrice}>
              <span>{currentPrice}</span>
              <span className={s.currency}>{` ${currency}`}</span>
            </div>
          </div>
          <Btn
            icon={<ShoppingCartSvg />}
            color="primary"
            onClickFunc={handleAddToCart}
            disable={isAddingToCart}
            className={s.cartBtn}
          >
            {isAddingToCart ? "..." : t("productCard.addToCart")}
          </Btn>
        </div>
      </div>
    </div>
  );
}

export default memo(Product);
