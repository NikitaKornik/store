import { createContext, useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SearchContext = createContext(null);
export const ProductContext = createContext(null);

function ContextProvider({ children }) {
  const [query, setQuery] = useState("");

  const [products, setProducts] = useState();
  const location = useLocation();

  useEffect(() => {
    setProducts(location);
  }, [location]);

  const searchContext = useMemo(() => ({
    query,
    setQuery,
  }));

  const productContext = useMemo(() => ({
    products,
    setProducts,
  }));

  return (
    <SearchContext.Provider value={searchContext}>
      <ProductContext.Provider value={productContext}>
        {children}
      </ProductContext.Provider>
    </SearchContext.Provider>
  );
}

export default ContextProvider;
