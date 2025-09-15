import { useState, useCallback } from "react";
import { localApiUtils } from "../services/api";
import { useParams } from "react-router-dom";

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функция для выполнения API вызовов
  const execute = useCallback(async (apiCall, ...args) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiCall(...args);
      const data = localApiUtils.checkResponse(response);

      return data;
    } catch (err) {
      const errorMessage = localApiUtils.handleError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Очистка ошибки
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    clearError,
  };
};

// Специализированный хук для продуктов
export const useProducts = () => {
  const { category } = useParams();
  const { loading, error, execute, clearError } = useAPI();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);

  // Получить все продукты
  const getAllProducts = useCallback(async () => {
    try {
      const { productsAPI } = await import("../services/api");
      const data = await execute(productsAPI.getByCategory);
      // const data = await execute(productsAPI.getAll);
      setProducts(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch products:", err);
      throw err;
    }
  }, [execute]);

  // Получить продукт по ID
  const getProductById = useCallback(
    async (id) => {
      try {
        const { productsAPI } = await import("../services/api");
        const data = await execute(productsAPI.getById, id);
        return data;
      } catch (err) {
        console.error("Failed to fetch product:", err);
        throw err;
      }
    },
    [execute]
  );

  // Поиск продуктов
  const searchProducts = useCallback(
    async (query) => {
      try {
        const { productsAPI } = await import("../services/api");
        const data = await execute(productsAPI.search, query);
        setProducts(data);
        return data;
      } catch (err) {
        console.error("Failed to search products:", err);
        throw err;
      }
    },
    [execute]
  );

  // Получить продукты с пагинацией
  const getPaginatedProducts = useCallback(
    async (page = 1, limit = 12) => {
      try {
        const { productsAPI } = await import("../services/api");
        const data = await execute(productsAPI.getPaginated, page, limit);
        setProducts(data.products);
        setPagination(data.pagination);
        return data;
      } catch (err) {
        console.error("Failed to fetch paginated products:", err);
        throw err;
      }
    },
    [execute]
  );

  return {
    products,
    pagination,
    loading,
    error,
    getAllProducts,
    getProductById,
    searchProducts,
    getPaginatedProducts,
    clearError,
  };
};

// Специализированный хук для корзины
export const useCart = () => {
  const { loading, error, execute, clearError } = useAPI();
  const [cart, setCart] = useState([]);

  // Получить корзину
  const getCart = useCallback(async () => {
    try {
      const { cartAPI } = await import("../services/api");
      const data = await execute(cartAPI.getCart);
      setCart(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      throw err;
    }
  }, [execute]);

  // Добавить в корзину
  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      try {
        const { cartAPI } = await import("../services/api");
        const data = await execute(cartAPI.addToCart, productId, quantity);
        // Обновляем локальное состояние корзины
        await getCart();
        return data;
      } catch (err) {
        console.error("Failed to add to cart:", err);
        throw err;
      }
    },
    [execute, getCart]
  );

  // Удалить из корзины
  const removeFromCart = useCallback(
    async (productId) => {
      try {
        const { cartAPI } = await import("../services/api");
        const data = await execute(cartAPI.removeFromCart, productId);
        // Обновляем локальное состояние корзины
        await getCart();
        return data;
      } catch (err) {
        console.error("Failed to remove from cart:", err);
        throw err;
      }
    },
    [execute, getCart]
  );

  // Обновить количество товара в корзине
  const updateCartItem = useCallback(
    async (productId, quantity) => {
      try {
        const { cartAPI } = await import("../services/api");
        const data = await execute(cartAPI.updateCartItem, productId, quantity);
        // Обновляем локальное состояние корзины
        await getCart();
        return data;
      } catch (err) {
        console.error("Failed to update cart item:", err);
        throw err;
      }
    },
    [execute, getCart]
  );

  // Очистить корзину
  const clearCart = useCallback(async () => {
    try {
      const { cartAPI } = await import("../services/api");
      const data = await execute(cartAPI.clearCart);
      // Обновляем локальное состояние корзины
      setCart([]);
      return data;
    } catch (err) {
      console.error("Failed to clear cart:", err);
      throw err;
    }
  }, [execute]);

  return {
    cart,
    loading,
    error,
    getCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    clearError,
  };
};
