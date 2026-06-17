import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useAPI";
import Btn from "../../components/UIkit/Btn/Btn";
import s from "./ProductPage.module.scss";
import Breadcrumbs from "../../components/UIkit/Breadcrumbs/Breadcrumbs";

function ProductPage() {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("Титановый");
  const [selectedMemory, setSelectedMemory] = useState("256GB");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        // Если продукт не найден, перенаправляем на главную
        navigate(`/products/${category}`);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, category, getProductById, navigate]);

  const handleBackClick = () => {
    console.log("Back button clicked, navigating to /");
    navigate(`/products/${category}`);
  };

  if (!product) {
    return null;
  }

  const totalPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;
  const cashback = Math.max(5, Math.round(totalPrice * 0.03));
  const colors = ["Титановый", "Черный", "Синий", "Белый"];
  const memoryOptions = ["128GB", "256GB", "512GB", "1TB"];

  return (
    <div className={s.root}>
      <Breadcrumbs productPage={true} />
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
            <div className={s.productId}>ID prod: {product.id}</div>
            <div className={s.optionGroup}>
              <span>Цвет</span>
              <div className={s.optionGrid}>
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`${s.optionBtn} ${
                      selectedColor === color ? s.selectedOption : ""
                    }`}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.optionGroup}>
              <span>Встроенная память</span>
              <div className={s.optionGrid}>
                {memoryOptions.map((memory) => (
                  <button
                    key={memory}
                    className={`${s.optionBtn} ${
                      selectedMemory === memory ? s.selectedOption : ""
                    }`}
                    type="button"
                    onClick={() => setSelectedMemory(memory)}
                  >
                    {memory}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.serviceGrid}>
              <div>
                <strong>Кэшбэк</strong>
                <span>{cashback} {product.currency}</span>
              </div>
              <div>
                <strong>Кредит</strong>
                <span>0 | 0 | 6</span>
              </div>
              <div>
                <strong>Доставка</strong>
                <span>бесплатно</span>
              </div>
              <div>
                <strong>Гарантия</strong>
                <span>24 месяца</span>
              </div>
            </div>
          </div>
          <div className={s.payment}>
            <div className={s.price}>
              <div className={s.priceInfo}>
                <span>Цена</span>
                <span>{`${product.price} ${product.currency}`}</span>
              </div>
              <div className={s.priceInfo}>
                <span>Скидка</span>
                <span>{product.discount ? `-${product.discount}%` : 0}</span>
              </div>
              <div className={s.line}></div>
              <div className={s.totalPrice}>
                <span>Общая стоимость</span>
                <span className={s.totalPricePrimary}>
                  {`${totalPrice} ${product.currency}`}
                </span>
              </div>
            </div>
            {/* <div className={s.price}>
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
              </div> */}
            <Btn color="primary" size="big">
              Купить
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
