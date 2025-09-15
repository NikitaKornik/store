import { products } from "../data/products";
import { apiConfig, apiUtils } from "../config/api";
// Имитация задержки сети (только если включена)

const simulateNetworkDelay = async (ms = 500) => {
  if (apiUtils.isNetworkSimulationEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
};

// Имитация ошибки сети (только если включена)
const simulateNetworkError = () => {
  if (apiUtils.isNetworkSimulationEnabled()) {
    return Math.random() < 0.01; // 1% вероятность ошибки (уменьшено с 10%)
  }
  return false;
};

// Обертка для имитации API вызовов
const apiCall = async (operation, data = null, retryCount = 0) => {
  try {
    // Имитируем задержку сети
    await simulateNetworkDelay();

    // Имитируем случайные ошибки сети
    if (simulateNetworkError()) {
      throw new Error("Network error");
    }

    return { success: true, data };
  } catch (error) {
    console.error(`API Error in ${operation}:`, error);

    // Автоматические повторные попытки для сетевых ошибок
    if (error.message === "Network error" && retryCount < 2) {
      console.log(`Retrying ${operation}... Attempt ${retryCount + 1}`);
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (retryCount + 1))
      ); // Экспоненциальная задержка
      return apiCall(operation, data, retryCount + 1);
    }

    throw error;
  }
};

// API для продуктов
export const productsAPI = {
  // Получить все продукты
  async getAll() {
    // Если мок отключен, здесь будет реальный API вызов
    if (!apiUtils.isMockEnabled()) {
      // TODO: Заменить на реальный API вызов
      // const response = await fetch(apiUtils.buildURL('/products'));
      // return response.json();
    }

    return apiCall("getAllProducts", products);
  },

  // Получить продукты по категории (для будущего использования)
  async getByCategory(category) {
    // Если мок отключен, здесь будет реальный API вызов
    if (!apiUtils.isMockEnabled()) {
      // TODO: Заменить на реальный API вызов
      // const response = await fetch(apiUtils.buildURL(`/products/category/${category}`));
      // return response.json();
    }
    // Пока возвращаем все продукты, но структура готова для категорий
    return apiCall("getProductsByCategory", products);
  },

  // Получить продукт по ID
  async getById(id) {
    // Если мок отключен, здесь будет реальный API вызов
    if (!apiUtils.isMockEnabled()) {
      // TODO: Заменить на реальный API вызов
      // const response = await fetch(apiUtils.buildURL(`/products/${id}`));
      // return response.json();
    }

    const product = products.find((p) => p.id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return apiCall("getProductById", product);
  },

  // Поиск продуктов
  async search(query) {
    // Если мок отключен, здесь будет реальный API вызов
    if (!apiUtils.isMockEnabled()) {
      // TODO: Заменить на реальный API вызов
      // const response = await fetch(apiUtils.buildURL(`/products/search?q=${encodeURIComponent(query)}`));
      // return response.json();
    }

    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.desc.toLowerCase().includes(query.toLowerCase())
    );
    return apiCall("searchProducts", filteredProducts);
  },

  // Получить продукты с пагинацией
  async getPaginated(page = 1, limit = 12) {
    // Если мок отключен, здесь будет реальный API вызов
    if (!apiUtils.isMockEnabled()) {
      // TODO: Заменить на реальный API вызов
      // const response = await fetch(apiUtils.buildURL(`/products?page=${page}&limit=${limit}`));
      // return response.json();
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
    const total = products.length;

    return apiCall("getPaginatedProducts", {
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  },
};

// API для корзины (для будущего использования)
export const cartAPI = {
  async getCart() {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(apiUtils.buildURL('/cart'));
    // return response.json();

    // Пока возвращаем мок данные из localStorage
    try {
      const cartData = localStorage.getItem("cart");
      console.log("getCart: localStorage data:", cartData);

      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        console.log("getCart: parsed cart:", parsedCart);
        return parsedCart;
      }

      console.log("getCart: empty cart, returning []");
      return [];
    } catch (error) {
      console.error("getCart: error parsing localStorage:", error);
      return [];
    }
  },

  async addToCart(productId, quantity = 1) {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(apiUtils.buildURL('/cart/add'), {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ productId, quantity })
    // });
    // return response.json();

    // Пока работаем с localStorage
    try {
      console.log(
        "addToCart: adding product",
        productId,
        "quantity:",
        quantity
      );

      const cartData = localStorage.getItem("cart");
      let cart = cartData ? JSON.parse(cartData) : [];
      console.log("addToCart: current cart:", cart);

      // Находим товар в списке продуктов
      const product = products.find((p) => p.id === productId);
      if (!product) {
        throw new Error("Товар не найден");
      }
      console.log("addToCart: found product:", product);

      // Проверяем, есть ли уже такой товар в корзине
      const existingItemIndex = cart.findIndex((item) => item.id === productId);

      if (existingItemIndex !== -1) {
        // Если товар уже есть, увеличиваем количество
        cart[existingItemIndex].quantity += quantity;
        console.log(
          "addToCart: updated existing item, new quantity:",
          cart[existingItemIndex].quantity
        );
      } else {
        // Если товара нет, добавляем новый
        cart.push({
          ...product,
          quantity: quantity,
        });
        console.log("addToCart: added new item to cart");
      }

      console.log("addToCart: final cart:", cart);

      // Сохраняем в localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      return apiCall("addToCart", { productId, quantity, success: true });
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
      throw error;
    }
  },

  async removeFromCart(productId) {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(apiUtils.buildURL(`/cart/remove/${productId}`), {
    //   method: 'DELETE'
    // });
    // return response.json();

    // Пока работаем с localStorage
    try {
      const cartData = localStorage.getItem("cart");
      let cart = cartData ? JSON.parse(cartData) : [];

      cart = cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));

      return apiCall("removeFromCart", { productId, success: true });
    } catch (error) {
      console.error("Ошибка при удалении из корзины:", error);
      throw error;
    }
  },

  async updateCartItem(productId, quantity) {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(apiUtils.buildURL(`/cart/update/${productId}`), {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ quantity })
    // });
    // return response.json();

    // Пока работаем с localStorage
    try {
      const cartData = localStorage.getItem("cart");
      let cart = cartData ? JSON.parse(cartData) : [];

      const itemIndex = cart.findIndex((item) => item.id === productId);
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          // Если количество 0 или меньше, удаляем товар
          cart = cart.filter((item) => item.id !== productId);
        } else {
          // Иначе обновляем количество
          cart[itemIndex].quantity = quantity;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
      }

      return apiCall("updateCartItem", { productId, quantity, success: true });
    } catch (error) {
      console.error("Ошибка при обновлении корзины:", error);
      throw error;
    }
  },

  async clearCart() {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch(apiUtils.buildURL('/cart/clear'), {
    //   method: 'DELETE'
    // });
    // return response.json();

    // Пока работаем с localStorage
    try {
      localStorage.removeItem("cart");
      return apiCall("clearCart", { success: true });
    } catch (error) {
      console.error("Ошибка при очистке корзины:", error);
      throw error;
    }
  },
};

// API для пользователей (для будущего использования)
export const userAPI = {
  async login(credentials) {
    // TODO: Заменить на реальный API вызов
    return apiCall("login", { user: { id: 1, name: "Test User" } });
  },

  async logout() {
    // TODO: Заменить на реальный API вызов
    return apiCall("logout", { success: true });
  },

  async getProfile() {
    // TODO: Заменить на реальный API вызов
    return apiCall("getProfile", {
      id: 1,
      name: "Test User",
      email: "test@example.com",
    });
  },
};

// Локальные утилиты для работы с API
export const localApiUtils = {
  // Обработка ошибок API
  handleError(error) {
    if (error.message === "Network error") {
      return "Ошибка сети. Проверьте подключение к интернету.";
    }
    if (error.message === "Product not found") {
      return "Продукт не найден.";
    }
    return "Произошла ошибка. Попробуйте позже.";
  },

  // Проверка статуса ответа
  checkResponse(response) {
    // Для mock API возвращаем данные напрямую
    // Для реального API здесь будет проверка статуса
    if (
      response &&
      typeof response === "object" &&
      response.success === false
    ) {
      throw new Error("API response error");
    }

    // Если это mock API ответ, возвращаем данные
    if (response && response.data !== undefined) {
      return response.data;
    }

    // Если это прямые данные (как в нашем случае), возвращаем их
    return response;
  },

  // Получение конфигурации API
  getConfig() {
    return apiConfig;
  },
};

// Создаем объект для экспорта по умолчанию
const apiService = {
  products: productsAPI,
  cart: cartAPI,
  user: userAPI,
  utils: localApiUtils,
};

// Экспорт для использования в компонентах
export default apiService;
