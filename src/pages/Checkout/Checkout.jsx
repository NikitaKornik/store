import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/ContextProvider";
import { useCart } from "../../hooks/useAPI";
import Btn from "../../components/UIkit/Btn/Btn";
import s from "./Checkout.module.scss";

const getItemPrice = (item) =>
  item.discount ? Math.round(item.price * (1 - item.discount / 100)) : item.price;

const cityOptions = [
  "Chisinau",
  "Balti",
  "Cahul",
  "Comrat",
  "Orhei",
  "Ungheni",
  "Soroca",
  "Edinet",
];

function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const { cart, loading, getCart, clearCart } = useCart();
  const [isCartReady, setIsCartReady] = useState(false);
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [paymentType, setPaymentType] = useState("installments");
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "+373 ",
    email: user?.email || "",
    city: "Chisinau",
    address: "Botanica, Dacia 31",
    comment: "",
  });

  useEffect(() => {
    let isMounted = true;

    getCart().finally(() => {
      if (isMounted) {
        setIsCartReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [getCart]);

  useEffect(() => {
    if (user) {
      setForm((currentForm) => ({
        ...currentForm,
        name: currentForm.name || user.name || "",
        phone: currentForm.phone || user.phone || "+373 ",
        email: currentForm.email || user.email || "",
      }));
    }
  }, [user]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + getItemPrice(item) * item.quantity,
      0
    );
    const discount = cart.reduce((sum, item) => {
      if (!item.discount) {
        return sum;
      }

      return sum + (item.price - getItemPrice(item)) * item.quantity;
    }, 0);
    const delivery = deliveryType === "delivery" && subtotal <= 600 ? 12 : 0;

    return {
      subtotal,
      discount,
      delivery,
      total: Math.round(subtotal + delivery),
      cashback: Math.max(5, Math.round(subtotal * 0.03)),
      count: cart.reduce((sum, item) => sum + item.quantity, 0),
      currency: cart[0]?.currency || "$",
    };
  }, [cart, deliveryType]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createdOrder = {
      id: `ML-${Math.floor(100000 + Math.random() * 900000)}`,
      total: totals.total,
      currency: totals.currency,
      count: totals.count,
      deliveryType,
      paymentType,
      address: deliveryType === "delivery" ? form.address : "MobileLend Botanica",
      customer: form.name,
    };

    setOrder(createdOrder);
    await clearCart();
  };

  if (order) {
    return (
      <div className={s.success}>
        <span>{t("checkoutPage.successTitle")}</span>
        <h1>{order.id}</h1>
        <p>{t("checkoutPage.successText", order)}</p>
        <div className={s.successActions}>
          <Btn color="primary" onClickFunc={() => navigate("/account")}>
            {t("checkoutPage.accountCta")}
          </Btn>
          <Btn color="secondary" onClickFunc={() => navigate("/products")}>
            {t("commonShoppingCta")}
          </Btn>
        </div>
      </div>
    );
  }

  if (!isCartReady) {
    return (
      <div className={s.success}>
        <span>Checkout</span>
        <h1>{t("checkoutPage.loadingTitle")}</h1>
        <p>{t("checkoutPage.loadingText")}</p>
      </div>
    );
  }

  if (!loading && cart.length === 0) {
    return (
      <div className={s.success}>
        <span>Checkout</span>
        <h1>{t("checkoutPage.emptyTitle")}</h1>
        <p>{t("checkoutPage.emptyText")}</p>
        <Btn color="primary" onClickFunc={() => navigate("/products")}>
          {t("commonCatalogCta")}
        </Btn>
      </div>
    );
  }

  return (
    <div className={s.root}>
      <section className={s.hero}>
        <div>
          <span>MobileLend checkout</span>
          <h1>{t("checkoutPage.title")}</h1>
          <p>{t("checkoutPage.text")}</p>
        </div>
        {!isAuthenticated && (
          <Link to="/login" state={{ from: "/checkout" }}>
            {t("checkoutPage.login")}
          </Link>
        )}
      </section>

      <form className={s.layout} onSubmit={handleSubmit}>
        <div className={s.formColumn}>
          <section className={s.panel}>
            <div className={s.panelHeader}>
              <span>{t("checkoutPage.step", { count: 1 })}</span>
              <h2>{t("checkoutPage.contacts")}</h2>
            </div>
            <div className={s.fieldGrid}>
              <label>
                {t("checkoutPage.name")}
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("checkoutPage.namePlaceholder")}
                  required
                />
              </label>
              <label>
                {t("checkoutPage.phone")}
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+373 ..."
                  required
                />
              </label>
              <label className={s.fullField}>
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </label>
            </div>
          </section>

          <section className={s.panel}>
            <div className={s.panelHeader}>
              <span>{t("checkoutPage.step", { count: 2 })}</span>
              <h2>{t("checkoutPage.receiving")}</h2>
            </div>
            <div className={s.segmented}>
              <button
                className={deliveryType === "pickup" ? s.activeOption : ""}
                type="button"
                onClick={() => setDeliveryType("pickup")}
              >
                {t("checkoutPage.pickupToday")}
              </button>
              <button
                className={deliveryType === "delivery" ? s.activeOption : ""}
                type="button"
                onClick={() => setDeliveryType("delivery")}
              >
                {t("checkoutPage.courierDelivery")}
              </button>
            </div>
            <div className={s.fieldGrid}>
              <label>
                {t("checkoutPage.city")}
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {deliveryType === "pickup"
                  ? t("checkoutPage.store")
                  : t("checkoutPage.address")}
                <input
                  name="address"
                  value={
                    deliveryType === "pickup"
                      ? "MobileLend Botanica, Dacia 31"
                      : form.address
                  }
                  onChange={handleChange}
                  disabled={deliveryType === "pickup"}
                  required
                />
              </label>
              <label className={s.fullField}>
                {t("checkoutPage.comment")}
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder={t("checkoutPage.commentPlaceholder")}
                />
              </label>
            </div>
          </section>

          <section className={s.panel}>
            <div className={s.panelHeader}>
              <span>{t("checkoutPage.step", { count: 3 })}</span>
              <h2>{t("checkoutPage.payment")}</h2>
            </div>
            <div className={s.paymentGrid}>
              {[
                ["installments", "0 | 0 | 6", t("checkoutPage.installments")],
                ["card", t("checkoutPage.card"), t("checkoutPage.cardText")],
                ["cash", t("checkoutPage.cash"), t("checkoutPage.cashText")],
              ].map(([value, title, text]) => (
                <button
                  className={paymentType === value ? s.activePayment : ""}
                  key={value}
                  type="button"
                  onClick={() => setPaymentType(value)}
                >
                  <strong>{title}</strong>
                  <span>{text}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className={s.summary}>
          <div className={s.panelHeader}>
            <span>{t("checkoutPage.summaryTitle")}</span>
            <h2>{t("commonItemsCount", { count: totals.count })}</h2>
          </div>
          <div className={s.productList}>
            {cart.map((item) => (
              <div className={s.productItem} key={item.id}>
                <img src={item.imgUrl} alt={item.title} />
                <div>
                  <strong>{item.title}</strong>
                  <span>
                    {item.quantity} x {getItemPrice(item)} {item.currency}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={s.totalRows}>
            <div>
              <span>{t("cartPage.products")}</span>
              <strong>
                {Math.round(totals.subtotal + totals.discount)} {totals.currency}
              </strong>
            </div>
            <div>
              <span>{t("cartPage.discount")}</span>
              <strong className={s.discount}>
                -{Math.round(totals.discount)} {totals.currency}
              </strong>
            </div>
            <div>
              <span>{t("cartPage.delivery")}</span>
              <strong>
                {totals.delivery === 0
                  ? t("commonFree")
                  : `${totals.delivery} ${totals.currency}`}
              </strong>
            </div>
            <div>
              <span>{t("cartPage.cashback")}</span>
              <strong className={s.cashback}>
                {totals.cashback} {totals.currency}
              </strong>
            </div>
          </div>
          <div className={s.totalBox}>
            <span>{t("cartPage.total")}</span>
            <strong>
              {totals.total} {totals.currency}
            </strong>
          </div>
          <Btn color="primary" disable={loading}>
            {t("checkoutPage.confirm")}
          </Btn>
          <button className={s.backButton} type="button" onClick={() => navigate("/cart")}>
            {t("checkoutPage.backToCart")}
          </button>
        </aside>
      </form>
    </div>
  );
}

export default Checkout;
