import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../../context/ContextProvider";
import Product from "../../components/Product/Product";
import Btn from "../../components/UIkit/Btn/Btn";
import s from "./Favorites.module.scss";

function Favorites() {
  const navigate = useNavigate();
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <div className={s.emptyState}>
        <h1>Избранное пусто</h1>
        <p>Сохраняйте товары сердцем, чтобы быстро вернуться к ним позже.</p>
        <Btn color="primary" onClickFunc={() => navigate("/products")}>
          Перейти к покупкам
        </Btn>
      </div>
    );
  }

  return (
    <div className={s.root}>
      <div className={s.header}>
        <div>
          <span className={s.eyebrow}>Ваш список</span>
          <h1>Избранные товары</h1>
        </div>
        <span className={s.count}>{favorites.length} товаров</span>
      </div>
      <div className={s.grid}>
        {favorites.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            imgUrl={product.imgUrl}
            title={product.title}
            desc={product.desc}
            price={product.price}
            currency={product.currency}
            discount={product.discount}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
