import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Header.module.scss";
import Btn from "../UIkit/Btn/Btn";
import Search from "../UIkit/Search/Search";
import { ReactComponent as LocateSvg } from "../../assets/icons/location.svg";
import { ReactComponent as HeartSvg } from "../../assets/icons/heart.svg";
import { ReactComponent as ShoppingCartSvg } from "../../assets/icons/shoppingCart.svg";
import { ReactComponent as LanguageSvg } from "../../assets/icons/language.svg";
import { useCart } from "../../hooks/useAPI";

function Header() {
  const navigate = useNavigate();
  const { cart, getCart } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    getCart();
  }, [getCart]);

  // Вычисляем общее количество товаров в корзине
  useEffect(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(totalItems);
  }, [cart]);

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className={s.root}>
      <Btn icon={<LocateSvg />} onClickFunc={() => console.log(1)}>
        Магазины
      </Btn>
      <Search onSearch={(value) => console.log("Ищем:", value)} />
      <div className={s.svgContainer}>
        <Btn
          icon={<HeartSvg />}
          color={"clear"}
          onClickFunc={() => console.log(1)}
        ></Btn>
        <Btn
          icon={<ShoppingCartSvg />}
          color={"clear"}
          onClickFunc={handleCartClick}
          style={{ position: "relative" }}
          notification={cartItemCount > 0 && cartItemCount}
        ></Btn>
        <Btn
          icon={<LanguageSvg />}
          color={"clear"}
          onClickFunc={() => console.log(1)}
        ></Btn>
      </div>
    </header>
  );
}

export default Header;
