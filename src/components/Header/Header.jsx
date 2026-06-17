import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext, FavoritesContext } from "../../context/ContextProvider";
import Btn from "../UIkit/Btn/Btn";
import Search from "../UIkit/Search/Search";
import s from "./Header.module.scss";
import { ReactComponent as LocateSvg } from "../../assets/icons/location.svg";
import { ReactComponent as HeartSvg } from "../../assets/icons/heart.svg";
import { ReactComponent as ShoppingCartSvg } from "../../assets/icons/shoppingCart.svg";
import { ReactComponent as LanguageSvg } from "../../assets/icons/language.svg";

function Header({ onMenuClick }) {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(false);
  const navigate = useNavigate();
  // const { cart, getCart } = useCart();
  const { cartItemCount } = useContext(CartContext);
  const { favoritesCount } = useContext(FavoritesContext);
  // const [cartItemCount, setCartItemCount] = useState(0);

  // useEffect(() => {
  //   getCart();
  // }, [getCart]);

  // Вычисляем общее количество товаров в корзине
  // useEffect(() => {
  //   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  //   setCartItemCount(totalItems);
  // }, [cart]);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
  };

  useEffect(() => {
    const handleScroll = () => {
      setOpacity(window.scrollY >= scrollY ? true : false);
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <header
      className={s.root}
      style={scrollY > 0 && opacity ? { opacity: 0 } : { opacity: 1 }}
    >
      <button
        className={s.menuBtn}
        type="button"
        onClick={onMenuClick}
        aria-label="Открыть меню категорий"
      >
        <span />
        <span />
        <span />
      </button>
      <Btn
        icon={<LocateSvg />}
        onClickFunc={() => console.log("location not avalivle now")}
        reduction={"tablet"}
      >
        Магазины
      </Btn>
      <Search onSearch={(value) => console.log("Ищем:", value)} />
      <div className={s.svgContainer}>
        <Btn
          icon={<HeartSvg />}
          color={"clear"}
          onClickFunc={handleFavoritesClick}
          style={{ position: "relative" }}
          notification={favoritesCount > 0 && favoritesCount}
          aria-label="Открыть избранное"
        ></Btn>
        <Btn
          icon={<ShoppingCartSvg />}
          color={"clear"}
          onClickFunc={handleCartClick}
          style={{ position: "relative" }}
          notification={cartItemCount > 0 && cartItemCount}
          aria-label="Открыть корзину"
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
