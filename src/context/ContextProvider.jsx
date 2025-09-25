import { createContext, useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../hooks/useAPI";

export const CartContext = createContext(null);
export const SearchContext = createContext(null);
export const ProductContext = createContext(null);

function ContextProvider({ children }) {
  const { cart, getCart } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    getCart();
  }, [getCart]);

  // Вычисляем общее количество товаров в корзине
  useEffect(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(totalItems);
  }, [cart]);

  const [query, setQuery] = useState("");

  const [products, setProducts] = useState();
  const location = useLocation();

  useEffect(() => {
    setProducts(location);
  }, [location]);

  const сartContext = useMemo(() => ({
    cart,
    getCart,
    cartItemCount,
    setCartItemCount,
  }));

  const searchContext = useMemo(() => ({
    query,
    setQuery,
  }));

  const productContext = useMemo(() => ({
    products,
    setProducts,
  }));

  return (
    <CartContext.Provider value={сartContext}>
      <SearchContext.Provider value={searchContext}>
        <ProductContext.Provider value={productContext}>
          {children}
        </ProductContext.Provider>
      </SearchContext.Provider>
    </CartContext.Provider>
  );
}

export default ContextProvider;
