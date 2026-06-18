import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../hooks/useAPI";
import { cartAPI } from "../../services/api";
import { CartActionsContext } from "../../context/ContextProvider";
import Btn from "../../components/UIkit/Btn/Btn";
import s from "./ProductPage.module.scss";
import Breadcrumbs from "../../components/UIkit/Breadcrumbs/Breadcrumbs";

function ProductPage() {
  const { t } = useTranslation();
  const { id, category } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { getCart } = useContext(CartActionsContext);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("titanium");
  const [selectedMemory, setSelectedMemory] = useState("256GB");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMonths, setSelectedMonths] = useState(6);
  const [activeTab, setActiveTab] = useState("description");
  const specs = useMemo(
    () =>
      product
        ? product.desc
            .split("|")
            .map((value) => value.trim())
            .filter(Boolean)
        : [],
    [product]
  );

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
    navigate(`/products/${category}`);
  };

  if (!product) {
    return null;
  }

  const totalPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;
  const cashback = Math.max(5, Math.round(totalPrice * 0.03));
  const colors = [
    { id: "titanium", label: t("productPage.colorTitanium") },
    { id: "black", label: t("productPage.colorBlack") },
    { id: "blue", label: t("productPage.colorBlue") },
    { id: "white", label: t("productPage.colorWhite") },
  ];
  const memoryOptions = ["128GB", "256GB", "512GB", "1TB"];
  const monthlyPayment = Math.ceil(totalPrice / selectedMonths);
  const galleryImages = [product.imgUrl, product.imgUrl, product.imgUrl];
  const availability = [
    { store: "Chișinău, MallDova", statusKey: "available", type: "available" },
    { store: "Chișinău, Botanica", statusKey: "limited", type: "limited" },
    { store: "Bălți, Centru", statusKey: "order", type: "order" },
  ];
  const tabs = [
    { id: "description", label: t("productPage.description") },
    { id: "specs", label: t("productPage.specs") },
    { id: "delivery", label: t("productPage.delivery") },
    { id: "reviews", label: t("productPage.reviews") },
  ];

  const handleAddToCart = async () => {
    await cartAPI.addToCart(product.id, 1);
    await getCart();
  };

  return (
    <div className={s.root}>
      <Breadcrumbs productPage={true} />
      <div className={s.header}>
        <Btn
          color="secondary"
          onClickFunc={handleBackClick}
          className={s.backButton}
        >
          {t("productPage.backToList")}
        </Btn>
        <div className={s.title}>{product.title}</div>
        <div className={s.desc}>{product.desc}</div>
      </div>
      <div className={s.product}>
        <div className={s.productInfo}>
          <div className={s.galleryMeta}>
            <span>
              {t(`categories.${product.category}`, {
                defaultValue: t("commonProduct"),
              })}
            </span>
            <strong>{product.discount ? `-${product.discount}%` : t("commonNew")}</strong>
          </div>
          <div className={s.imgContainer}>
            <img
              className={s.img}
              src={galleryImages[selectedImageIndex]}
              alt={product.title}
            />
          </div>
          <div className={s.thumbnails}>
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                className={`${s.thumbnail} ${
                  selectedImageIndex === index ? s.activeThumbnail : ""
                }`}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img src={image} alt={`${product.title} ${index + 1}`} />
              </button>
            ))}
          </div>
          <div className={s.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${s.tabBtn} ${activeTab === tab.id ? s.activeTab : ""}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className={s.tabPanel}>
            {activeTab === "description" && (
              <p>
                {t("productPage.descriptionText", {
                  title: product.title,
                  desc: product.desc,
                })}
              </p>
            )}
            {activeTab === "specs" && (
              <div className={s.specGrid}>
                {specs.map((spec, index) => (
                  <div key={spec}>
                    <span>{t("productPage.parameter", { count: index + 1 })}</span>
                    <strong>{spec}</strong>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "delivery" && (
              <div className={s.deliveryInfo}>
                <div>
                  <strong>{t("productPage.pickup")}</strong>
                  <span>{t("productPage.pickupText")}</span>
                </div>
                <div>
                  <strong>{t("productPage.courier")}</strong>
                  <span>{t("productPage.courierText", { currency: product.currency })}</span>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <p>{t("productPage.reviewsText")}</p>
            )}
          </div>
        </div>
        <div className={s.configurationAndPayment}>
          <div className={s.configuration}>
            <div className={s.productId}>ID prod: {product.id}</div>
            <div className={s.optionGroup}>
              <span>{t("productPage.color")}</span>
              <div className={s.optionGrid}>
                {colors.map((color) => (
                  <button
                    key={color.id}
                    className={`${s.optionBtn} ${
                      selectedColor === color.id ? s.selectedOption : ""
                    }`}
                    type="button"
                    onClick={() => setSelectedColor(color.id)}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.optionGroup}>
              <span>{t("productPage.memory")}</span>
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
                <strong>{t("cartPage.cashback")}</strong>
                <span>{cashback} {product.currency}</span>
              </div>
              <div>
                <strong>{t("productPage.credit")}</strong>
                <span>0 | 0 | 6</span>
              </div>
              <div>
                <strong>{t("productPage.delivery")}</strong>
                <span>{t("productPage.freeLower")}</span>
              </div>
              <div>
                <strong>{t("productPage.warranty")}</strong>
                <span>{t("productPage.months24")}</span>
              </div>
            </div>
            <div className={s.availability}>
              <div className={s.blockTitle}>{t("productPage.availability")}</div>
              {availability.map((item) => (
                <div className={s.availabilityRow} key={item.store}>
                  <span>{item.store}</span>
                  <strong className={s[item.type]}>
                    {t(`productPage.${item.statusKey}`)}
                  </strong>
                </div>
              ))}
            </div>
            <div className={s.creditBox}>
              <div className={s.blockTitle}>{t("productPage.installments")}</div>
              <div className={s.monthSelector}>
                {[4, 6, 8, 12].map((month) => (
                  <button
                    key={month}
                    className={`${s.monthBtn} ${
                      selectedMonths === month ? s.selectedMonth : ""
                    }`}
                    type="button"
                    onClick={() => setSelectedMonths(month)}
                  >
                    {t("productPage.monthShort", { count: month })}
                  </button>
                ))}
              </div>
              <div className={s.monthlyPayment}>
                <span>{t("productPage.monthly")}</span>
                <strong>
                  {monthlyPayment} {product.currency}
                </strong>
              </div>
            </div>
          </div>
          <div className={s.payment}>
            <div className={s.price}>
              <div className={s.priceInfo}>
                <span>{t("productPage.price")}</span>
                <span>{`${product.price} ${product.currency}`}</span>
              </div>
              <div className={s.priceInfo}>
                <span>{t("cartPage.discount")}</span>
                <span>{product.discount ? `-${product.discount}%` : 0}</span>
              </div>
              <div className={s.line}></div>
              <div className={s.totalPrice}>
                <span>{t("productPage.totalPrice")}</span>
                <span className={s.totalPricePrimary}>
                  {`${totalPrice} ${product.currency}`}
                </span>
              </div>
            </div>
            <Btn color="primary" size="big" onClickFunc={handleAddToCart}>
              {t("productPage.buy")}
            </Btn>
          </div>
        </div>
      </div>
      <div className={s.stickyBuy}>
        <div>
          <span>{t("productPage.toPay")}</span>
          <strong>
            {totalPrice} {product.currency}
          </strong>
        </div>
        <button type="button" onClick={handleAddToCart}>
          {t("productPage.buy")}
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
