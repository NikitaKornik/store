import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import s from "./ProductPage.module.scss";
import Btn from "../UIkit/Btn/Btn";
import { useProducts } from "../../hooks/useAPI";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        // Если продукт не найден, перенаправляем на главную
        navigate("/");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, getProductById, navigate]);

  const handleBackClick = () => {
    console.log("Back button clicked, navigating to /");
    navigate("/");
  };

  if (!product) {
    return null;
  }

  return (
    <div className={s.root}>
      <div className={s.header}>
        <Btn
          color="secondary"
          onClickFunc={handleBackClick}
          style={{ marginBottom: "20px" }}
        >
          ← Назад к списку
        </Btn>
        <div className={s.title}>{product.title}</div>
        <div className={s.desc}>{product.desc}</div>
      </div>
      <div className={s.product}>
        <div className={s.productInfo}>
          <div className={s.imgContainer}>
            <img className={s.img} src={product.imgUrl} alt={product.title} />
          </div>
        </div>
        <div className={s.configurationAndPayment}>
          <div className={s.configuration}>
            <div>ID prod: {product.id}</div>
          </div>
          <div className={s.payment}>
            <div className={s.priceAndCurrency}>
              <div className={s.price}>
                {product.discount
                  ? `${product.price * (1 - product.discount / 100)} ${
                      product.currency
                    }`
                  : `${product.price} ${product.currency}`}
                {product.discount && (
                  <span className={s.originalPrice}>
                    {product.price} {product.currency}
                  </span>
                )}
              </div>
              <Btn color="primary" size="big">
                Купить
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
