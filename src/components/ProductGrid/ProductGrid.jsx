import React, { memo } from "react";
import Product from "../Product/Product";
import s from "./ProductGrid.module.scss";

function ProductGrid({ products }) {
  return (
    <div className={s["product-grid"]}>
      {products.map((product) => (
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
  );
}

export default memo(ProductGrid);
