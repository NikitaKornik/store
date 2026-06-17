import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useAPI";
import { CartContext, FavoritesContext } from "../../context/ContextProvider";
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
  const { addToCart } = useCart();
  const { getCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const isFavorite = favorites.some((item) => item.id === id);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(id, 1);
      await getCart();
      // Можно добавить уведомление об успешном добавлении
      console.log(`Товар "${title}" добавлен в корзину`);
    } catch (err) {
      console.error("Ошибка при добавлении в корзину:", err);
      // Можно добавить уведомление об ошибке
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleFavoriteClick = async () => {
    try {
      await toggleFavorite(id);
    } catch (err) {
      console.error("Ошибка при обновлении избранного:", err);
    }
  };

  const currentPrice = discount ? Math.round(price * (1 - discount / 100)) : price;
  const cashback = Math.max(5, Math.round(currentPrice * 0.03));

  return (
    <div className={s.root}>
      <div className={s.cardTop}>
        {discount && <div className={s.discountBadge}>{`-${discount}%`}</div>}
        <button
          className={`${s.favoriteBtn} ${isFavorite ? s.favoriteBtnActive : ""}`}
          type="button"
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite ? "Удалить из избранного" : "Добавить в избранное"
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
          <span>{category}</span>
          {discount && <span>неделя</span>}
        </div>
        <div className={s.title}>
          <Link to={`/products/${category}/${id}`}>{title}</Link>
        </div>

        <div className={s.desc}>{desc}</div>
        <div className={s.benefits}>
          <span>Кэшбэк {cashback} {currency}</span>
          <span>Кредит 0 | 0 | 6</span>
        </div>
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
            {isAddingToCart ? "..." : "В корзину"}
          </Btn>
        </div>
      </div>
    </div>
  );
}

export default Product;
