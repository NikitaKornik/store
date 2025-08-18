import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Cart.module.scss";
import { useCart } from "../../hooks/useAPI";
import Btn from "../UIkit/Btn/Btn";
import { ReactComponent as TrashSvg } from "../../assets/icons/archive-svgrepo-com.svg";

function Cart() {
  const navigate = useNavigate();
  const { cart, loading, error, getCart, removeFromCart, updateCartItem } =
    useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCart();
  }, [getCart]);

  // Вычисляем общую стоимость корзины
  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      const itemPrice = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return sum + itemPrice * item.quantity;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  // Обработчик изменения количества товара
  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateCartItem(productId, newQuantity);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // Обработчик удаления товара из корзины
  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // Обработчик оформления заказа
  const handleCheckout = () => {
    // TODO: Реализовать логику оформления заказа
    console.log("Оформление заказа на сумму:", totalPrice);
  };

  if (loading) {
    return (
      <div className={s.root}>
        <div className={s.loading}>Загрузка корзины...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.root}>
        <div className={s.error}>
          Ошибка загрузки корзины: {error}
          <Btn onClickFunc={() => getCart()} color="primary">
            Попробовать снова
          </Btn>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={s.root}>
        <div className={s.emptyCart}>
          <h2>Корзина пуста</h2>
          <p>Добавьте товары в корзину, чтобы продолжить покупки</p>
          <Btn onClickFunc={() => navigate("/")} color="primary">
            Перейти к покупкам
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div className={s.root}>
      {/* Заголовок */}
      <div className={s.header}>
        <Btn
          onClickFunc={() => navigate("/")}
          color="secondary"
          style={{ marginRight: "20px" }}
        >
          ← Назад к покупкам
        </Btn>
        <h1>Корзина</h1>
      </div>

      {/* Список товаров */}
      <div className={s.cartItems}>
        {cart.map((item) => (
          <div key={item.id} className={s.cartItem}>
            {/* Изображение товара */}
            <div className={s.itemImage}>
              <img src={item.imgUrl} alt={item.title} />
            </div>

            {/* Информация о товаре */}
            <div className={s.itemInfo}>
              <h3 className={s.itemTitle}>{item.title}</h3>
              <p className={s.itemDesc}>{item.desc}</p>

              {/* Цена с учетом скидки */}
              <div className={s.itemPrice}>
                {item.discount ? (
                  <>
                    <span className={s.discountedPrice}>
                      {Math.round(item.price * (1 - item.discount / 100))}{" "}
                      {item.currency}
                    </span>
                    <span className={s.originalPrice}>
                      {item.price} {item.currency}
                    </span>
                    <span className={s.discountBadge}>-{item.discount}%</span>
                  </>
                ) : (
                  <span className={s.price}>
                    {item.price} {item.currency}
                  </span>
                )}
              </div>
            </div>

            {/* Управление количеством */}
            <div className={s.itemQuantity}>
              <Btn
                onClickFunc={() =>
                  handleQuantityChange(item.id, item.quantity - 1)
                }
                color="secondary"
                size="small"
                disable={item.quantity <= 1}
              >
                -
              </Btn>
              <span className={s.quantity}>{item.quantity}</span>
              <Btn
                onClickFunc={() =>
                  handleQuantityChange(item.id, item.quantity + 1)
                }
                color="secondary"
                size="small"
              >
                +
              </Btn>
            </div>

            {/* Общая стоимость товара */}
            <div className={s.itemTotal}>
              {Math.round(
                (item.discount
                  ? item.price * (1 - item.discount / 100)
                  : item.price) * item.quantity
              )}{" "}
              {item.currency}
            </div>

            {/* Кнопка удаления */}
            <div className={s.itemActions}>
              <Btn
                onClickFunc={() => handleRemoveItem(item.id)}
                color="clear"
                size="small"
                icon={<TrashSvg />}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Итоги корзины */}
      <div className={s.cartSummary}>
        <div className={s.summaryInfo}>
          <div className={s.summaryRow}>
            <span>Товаров в корзине:</span>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className={s.summaryRow}>
            <span>Общая стоимость:</span>
            <span className={s.totalPrice}>
              {Math.round(totalPrice)} {cart[0]?.currency || "₽"}
            </span>
          </div>
        </div>

        <div className={s.summaryActions}>
          <Btn onClickFunc={() => navigate("/")} color="secondary">
            Продолжить покупки
          </Btn>
          <Btn onClickFunc={handleCheckout} color="primary">
            Оформить заказ
          </Btn>
        </div>
      </div>
    </div>
  );
}

export default Cart;
