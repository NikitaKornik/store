import React, { useState } from "react";
import s from "./Product.module.scss";
import { ReactComponent as ShoppingCartSvg } from "../../assets/icons/shoppingCart.svg";
import cn from "classnames";
import Btn from "../UIkit/Btn/Btn";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useAPI";

function Product({ imgUrl, title, desc, price, currency, discount, id }) {
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
      <Link to={`/product/${id}`}>
        <img className={s.img} src={imgUrl} alt="" />
      </Link>
      <div className={s.infoContainer}>
        <div className={s.title}>
          <Link to={`/product/${id}`}>{title}</Link>
        </div>

        <div className={s.desc}>{desc}</div>
        <div className={s.priceAndBtn}>
          <div
            className={cn(s.priceContainer, {
              [s.discount]: discount,
            })}
            data-content={price * (1 - discount / 100) + " " + currency}
          >
            <span
              className={s.price}
              data-content={discount && `-${discount}%`}
            >
              {price}
            </span>
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
