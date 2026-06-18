import React, { useCallback, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../../hooks/useAPI";
import Btn from "../UIkit/Btn/Btn";
import EmptyState from "../UIkit/EmptyState/EmptyState";
import PageHero from "../UIkit/PageHero/PageHero";
import s from "./Cart.module.scss";
import { ReactComponent as TrashSvg } from "../../assets/icons/archive-svgrepo-com.svg";

const getItemPrice = (item) =>
  item.discount ? Math.round(item.price * (1 - item.discount / 100)) : item.price;

function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, loading, error, getCart, removeFromCart, updateCartItem } =
    useCart();

  useEffect(() => {
    getCart();
  }, [getCart]);

  const totals = useMemo(() => {
    const totalPrice = cart.reduce((sum, item) => {
      const itemPrice = getItemPrice(item);
      return sum + itemPrice * item.quantity;
    }, 0);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalDiscount = cart.reduce((sum, item) => {
      if (!item.discount) {
        return sum;
      }

      return sum + (item.price - getItemPrice(item)) * item.quantity;
    }, 0);
    const deliveryPrice = totalPrice > 600 ? 0 : 12;

    return {
      totalPrice,
      totalItems,
      totalDiscount,
      cashback: Math.max(5, Math.round(totalPrice * 0.03)),
      deliveryPrice,
      orderTotal: Math.round(totalPrice + deliveryPrice),
      currency: cart[0]?.currency || "$",
    };
  }, [cart]);

  const {
    totalPrice,
    totalItems,
    totalDiscount,
    cashback,
    deliveryPrice,
    orderTotal,
    currency,
  } = totals;

  const handleQuantityChange = useCallback(async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateCartItem(productId, newQuantity);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  }, [updateCartItem]);

  const handleRemoveItem = useCallback(async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  }, [removeFromCart]);

  const handleCheckout = useCallback(() => {
    navigate("/checkout");
  }, [navigate]);

  if (loading) {
    return (
      <div className={s.root}>
        <div className={s.loading}>{t("cartPage.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.root}>
        <div className={s.error}>
          {t("cartPage.error", { error })}
          <Btn onClickFunc={() => getCart()} color="primary">
            {t("commonRetry")}
          </Btn>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={s.root}>
        <EmptyState
          eyebrow="MobileLend checkout"
          title={t("cartPage.emptyTitle")}
          text={t("cartPage.emptyText")}
          action={
            <Btn onClickFunc={() => navigate("/products")} color="primary">
              {t("commonCatalogCta")}
            </Btn>
          }
        />
      </div>
    );
  }

  return (
    <div className={s.root}>
      <PageHero
        eyebrow="MobileLend checkout"
        title={t("cartPage.title")}
        text={t("cartPage.text")}
        action={
          <Btn onClickFunc={() => navigate("/products")} color="secondary">
            {t("commonBackToShopping")}
          </Btn>
        }
      />

      <div className={s.checkoutLayout}>
        <div className={s.cartItems}>
          {cart.map((item) => {
            const itemPrice = getItemPrice(item);
            const itemTotal = itemPrice * item.quantity;

            return (
              <article key={item.id} className={s.cartItem}>
                <Link
                  className={s.itemImage}
                  to={`/products/${item.category}/${item.id}`}
                >
                  <img src={item.imgUrl} alt={item.title} />
                </Link>

                <div className={s.itemInfo}>
                  <div className={s.itemTop}>
                    <span>
                      {t(`categories.${item.category}`, {
                        defaultValue: item.category,
                      })}
                    </span>
                    {item.discount && (
                      <strong className={s.discountBadge}>-{item.discount}%</strong>
                    )}
                  </div>
                  <Link
                    className={s.itemTitle}
                    to={`/products/${item.category}/${item.id}`}
                  >
                    {item.title}
                  </Link>
                  <p className={s.itemDesc}>{item.desc}</p>
                  <div className={s.itemMeta}>
                    <span>
                      {t("productCard.cashback", {
                        amount: Math.max(5, Math.round(itemPrice * 0.03)),
                        currency: item.currency,
                      })}
                    </span>
                    <span>{t("cartPage.warranty")}</span>
                  </div>
                </div>

                <div className={s.itemControls}>
                  <div className={s.itemPrice}>
                    <span className={s.price}>
                      {itemPrice} {item.currency}
                    </span>
                    {item.discount && (
                      <span className={s.originalPrice}>
                        {item.price} {item.currency}
                      </span>
                    )}
                  </div>

                  <div className={s.quantityControl} aria-label={t("cartPage.quantity")}>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className={s.itemTotal}>
                    <span>{t("cartPage.itemTotal")}</span>
                    <strong>
                      {Math.round(itemTotal)} {item.currency}
                    </strong>
                  </div>

                  <button
                    className={s.removeBtn}
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label={t("cartPage.remove", { title: item.title })}
                  >
                    <TrashSvg />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <aside className={s.cartSummary}>
          <div className={s.summaryHeader}>
            <span>{t("cartPage.summaryTitle")}</span>
            <strong>{t("commonItemsCount", { count: totalItems })}</strong>
          </div>

          <div className={s.summaryInfo}>
            <div className={s.summaryRow}>
              <span>{t("cartPage.products")}</span>
              <strong>
                {Math.round(totalPrice + totalDiscount)} {currency}
              </strong>
            </div>
            <div className={s.summaryRow}>
              <span>{t("cartPage.discount")}</span>
              <strong className={s.discountValue}>
                −{Math.round(totalDiscount)} {currency}
              </strong>
            </div>
            <div className={s.summaryRow}>
              <span>{t("cartPage.delivery")}</span>
              <strong>
                {deliveryPrice === 0 ? t("commonFree") : `${deliveryPrice} ${currency}`}
              </strong>
            </div>
            <div className={s.summaryRow}>
              <span>{t("cartPage.cashback")}</span>
              <strong className={s.cashback}>
                {cashback} {currency}
              </strong>
            </div>
          </div>

          <div className={s.totalBox}>
            <span>{t("cartPage.total")}</span>
            <strong>
              {orderTotal} {currency}
            </strong>
          </div>

          <div className={s.summaryBenefits}>
            <div>
              <span>0 | 0 | 6</span>
              <p>{t("cartPage.installmentsText")}</p>
            </div>
            <div>
              <span>{t("cartPage.pickupTitle")}</span>
              <p>{t("cartPage.pickupText")}</p>
            </div>
          </div>

          <div className={s.summaryActions}>
            <Btn onClickFunc={handleCheckout} color="primary">
              {t("cartPage.checkout")}
            </Btn>
            <Btn onClickFunc={() => navigate("/products")} color="secondary">
              {t("commonShoppingCta")}
            </Btn>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
