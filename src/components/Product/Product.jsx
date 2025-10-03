import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useAPI";
import Btn from "../UIkit/Btn/Btn";
import s from "./Product.module.scss";
import { ReactComponent as ShoppingCartSvg } from "../../assets/icons/shoppingCart.svg";

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
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(id, 1);
      // Можно добавить уведомление об успешном добавлении
      console.log(`Товар "${title}" добавлен в корзину`);
    } catch (err) {
      console.error("Ошибка при добавлении в корзину:", err);
      // Можно добавить уведомление об ошибке
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className={s.root}>
      {/* <Link to={`product/${id}`}> */}
      <Link to={`/products/${category}/${id}`}>
        <div className={s.imgContainer}>
          <img className={s.img} src={imgUrl} alt="" />
        </div>
      </Link>
      <div className={s.infoContainer}>
        <div className={s.title}>
          <Link to={`/products/${category}/${id}`}>{title}</Link>
        </div>

        <div className={s.desc}>{desc}</div>
        <div className={s.priceAndBtn}>
          <div className={s.priceContainer}>
            {discount && (
              <div className={s.discountPrice}>
                <div
                  className={s.priceWithoutDiscount}
                >{`${price}\u00A0${currency}`}</div>
                <div className={s.discountLabel}>{`-${discount}%`}</div>
              </div>
            )}
            <span>{discount ? price * (1 - discount / 100) + " " : price}</span>
            <span className={s.currency}>{` ${currency}`}</span>
          </div>
          <Btn
            icon={<ShoppingCartSvg />}
            color="primary"
            onClickFunc={handleAddToCart}
            disable={isAddingToCart}
          >
            {isAddingToCart ? "..." : ""}
          </Btn>
        </div>
      </div>
    </div>
  );
}

export default Product;
