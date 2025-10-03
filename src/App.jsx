import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContextProvider, { ProductContext } from "./context/ContextProvider";
import s from "./App.module.scss";
import AsideNav from "./components/AsideNav/AsideNav";
import LayOut from "./components/LayOut/LayOut";
// import Pagination from "./components/Pagination/Pagination";
import ProductList from "./pages/ProductList/ProductList";
import ProductPage from "./pages/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";
import "./styles/__colors.scss";
import BrandList from "./components/BrandList/BrandList";
import Catalog from "./components/Catalog/Catalog";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className={s.root}>
          <AsideNav />
          <LayOut>
            <Routes>
              <Route path="cart" element={<Cart />} />
              <Route path="products/:category/:id" element={<ProductPage />} />
              <Route path="products/:category" element={<ProductList />} />
              <Route path="products" element={<ProductList />} />
              <Route
                path=""
                element={
                  <>
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
