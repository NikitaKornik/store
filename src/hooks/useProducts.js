import { useState, useEffect } from "react";
import { getAllProducts, getProductsByCategory } from "../services/api";

export function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let data;
        if (category) {
          data = await getProductsByCategory(category);
        } else {
          data = await getAllProducts();
        }
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category]);

  return { products, loading };
}