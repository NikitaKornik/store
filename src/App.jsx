import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ContextProvider from "./context/ContextProvider";
import s from "./App.module.scss";
import AsideNav from "./components/AsideNav/AsideNav";
import LayOut from "./components/LayOut/LayOut";
// import Pagination from "./components/Pagination/Pagination";
import ProductList from "./pages/ProductList/ProductList";
import ProductPage from "./pages/ProductPage/ProductPage";
import Favorites from "./pages/Favorites/Favorites";
import Compare from "./pages/Compare/Compare";
import Stores from "./pages/Stores/Stores";
import Account from "./pages/Account/Account";
import Login from "./pages/Login/Login";
import Checkout from "./pages/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import "./styles/__colors.scss";
import BrandList from "./components/BrandList/BrandList";
import PromoHighlights from "./components/PromoHighlights/PromoHighlights";
import ServiceStrip from "./components/ServiceStrip/ServiceStrip";
import { catalog } from "./data/catalog";
import { products } from "./data/products";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <ContextProvider>
        <div className={s.root}>
          <AsideNav
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
          <LayOut onMenuClick={() => setIsMobileMenuOpen(true)}>
            <Routes>
              <Route path="cart" element={<Cart />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="compare" element={<Compare />} />
              <Route path="stores" element={<Stores />} />
              <Route path="account" element={<Account />} />
              <Route path="login" element={<Login />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="products/:category/:id" element={<ProductPage />} />
              <Route path="products/:category" element={<ProductList />} />
              <Route path="products" element={<ProductList />} />
              <Route path="" element={<HomePage />} />
            </Routes>
          </LayOut>
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

function HomePage() {
  const { t } = useTranslation();
  const heroProducts = [products[0], products[4], products[20]];
  const offerProducts = [products[0], products[6], products[12], products[20]];
  const newProducts = [products[30], products[34], products[42], products[50]];
  const featuredProduct = products[4];
  const getPrice = (product) =>
    product.discount
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroContent}>
          <span className={s.heroEyebrow}>{t("heroEyebrow")}</span>
          <h1>{t("heroTitle")}</h1>
          <p>{t("heroText")}</p>
          <div className={s.heroActions}>
            <Link to="/products/smartphones">{t("homePrimaryCta")}</Link>
            <Link to="/stores">{t("homeSecondaryCta")}</Link>
          </div>
        </div>
        <div className={s.heroVisual}>
          {heroProducts.map((product) => (
            <Link
              className={s.heroDevice}
              key={product.id}
              to={`/products/${product.category}/${product.id}`}
            >
              <img src={product.imgUrl} alt={product.title} />
              <span>{product.title}</span>
            </Link>
          ))}
        </div>
        <div className={s.heroStats}>
          <div>
            <strong>10+</strong>
            <span>{t("brands")}</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>{t("online")}</span>
          </div>
        </div>
      </section>
      <PromoHighlights />
      <section className={s.dealBoard}>
        <Link
          className={s.mainDeal}
          to={`/products/${featuredProduct.category}/${featuredProduct.id}`}
        >
          <div>
            <span>{t("homeDealEyebrow")}</span>
            <h2>{t("homeDealTitle")}</h2>
            <p>{t("homeDealText")}</p>
            <strong>
              {getPrice(featuredProduct)} {featuredProduct.currency}
            </strong>
          </div>
          <img src={featuredProduct.imgUrl} alt={featuredProduct.title} />
        </Link>
        <div className={s.sideDeals}>
          <Link to="/products/smartphones">
            <span>{t("homeOnlyToday")}</span>
            <strong>Trade-In</strong>
            <small>{t("tradeInText")}</small>
          </Link>
          <Link to="/products/laptops">
            <span>{t("homeMonthly")}</span>
            <strong>0 | 0 | 6</strong>
            <small>{t("creditText")}</small>
          </Link>
        </div>
      </section>
      <section className={s.homeSection}>
        <div className={s.sectionHeader}>
          <div>
            <span>MobileLend catalog</span>
            <h2>{t("homePopularCategories")}</h2>
          </div>
          <Link to="/products">{t("homeViewAllProducts")}</Link>
        </div>
        <div className={s.categoryGrid}>
          {catalog.map((item) => (
            <Link
              className={s.categoryTile}
              key={item.id}
              to={`/products/${item.category}`}
            >
              <img src={item.imgUrl} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>{t("homeInStock")}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className={s.homeSection}>
        <div className={s.sectionHeader}>
          <div>
            <span>{t("homeDealEyebrow")}</span>
            <h2>{t("homePopularProducts")}</h2>
          </div>
          <Link to="/products/smartphones">{t("homeViewAllProducts")}</Link>
        </div>
        <div className={s.productStrip}>
          {offerProducts.map((product) => (
            <Link
              className={s.homeProduct}
              key={product.id}
              to={`/products/${product.category}/${product.id}`}
            >
              {product.discount && (
                <span className={s.discount}>-{product.discount}%</span>
              )}
              <img src={product.imgUrl} alt={product.title} />
              <strong>{product.title}</strong>
              <small>{product.desc}</small>
              <div>
                <span>
                  {getPrice(product)} {product.currency}
                </span>
                <em>{t("cashback")}</em>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className={s.homeSection}>
        <div className={s.sectionHeader}>
          <div>
            <span>{t("homeFreshEyebrow")}</span>
            <h2>{t("homeNewArrivals")}</h2>
          </div>
          <Link to="/products">{t("homeViewAllProducts")}</Link>
        </div>
        <div className={s.productStrip}>
          {newProducts.map((product) => (
            <Link
              className={s.homeProduct}
              key={product.id}
              to={`/products/${product.category}/${product.id}`}
            >
              <span className={s.newBadge}>new</span>
              <img src={product.imgUrl} alt={product.title} />
              <strong>{product.title}</strong>
              <small>{product.desc}</small>
              <div>
                <span>
                  {t("homeFrom")} {getPrice(product)} {product.currency}
                </span>
                <em>0 | 0 | 6</em>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ServiceStrip />
      <BrandList />
    </>
  );
}

export default App;
