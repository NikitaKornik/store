import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContextProvider from "./context/ContextProvider";
import s from "./App.module.scss";
import AsideNav from "./components/AsideNav/AsideNav";
import LayOut from "./components/LayOut/LayOut";
// import Pagination from "./components/Pagination/Pagination";
import ProductList from "./pages/ProductList/ProductList";
import ProductPage from "./pages/ProductPage/ProductPage";
import Favorites from "./pages/Favorites/Favorites";
import Cart from "./components/Cart/Cart";
import "./styles/__colors.scss";
import BrandList from "./components/BrandList/BrandList";
import Catalog from "./components/Catalog/Catalog";
import PromoHighlights from "./components/PromoHighlights/PromoHighlights";
import ServiceStrip from "./components/ServiceStrip/ServiceStrip";

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
              <Route path="products/:category/:id" element={<ProductPage />} />
              <Route path="products/:category" element={<ProductList />} />
              <Route path="products" element={<ProductList />} />
              <Route
                path=""
                element={
                  <>
                    <section className={s.hero}>
                      <div className={s.heroContent}>
                        <span className={s.heroEyebrow}>MobileLend Store</span>
                        <h1>Техника, которую приятно выбирать</h1>
                        <p>
                          Смартфоны, ноутбуки, аудио и аксессуары в одном
                          аккуратном каталоге.
                        </p>
                      </div>
                      <div className={s.heroStats}>
                        <div>
                          <strong>10+</strong>
                          <span>брендов</span>
                        </div>
                        <div>
                          <strong>24/7</strong>
                          <span>онлайн</span>
                        </div>
                      </div>
                    </section>
                    <PromoHighlights />
                    <ServiceStrip />
                    <BrandList />
                    <Catalog />
                  </>
                }
              />
            </Routes>
          </LayOut>
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
