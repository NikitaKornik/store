import { BrowserRouter, Route, Routes } from "react-router-dom";
import s from "./App.module.scss";
import AsideNav from "./components/AsideNav/AsideNav";
import LayOut from "./components/LayOut/LayOut";
// import Pagination from "./components/Pagination/Pagination";
import ProductList from "./components/ProductList/ProductList";
import ProductPage from "./components/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";
import "./styles/__colors.scss";

function App() {
  return (
    <BrowserRouter>
      <div className={s.root}>
        <AsideNav />
        <LayOut>
          <Routes>
            <Route path="cart" element={<Cart />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="*" element={<ProductList />} />
          </Routes>
        </LayOut>
      </div>
    </BrowserRouter>
  );
}

export default App;
