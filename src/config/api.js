// Конфигурация API для разных окружений
const config = {
  // Разработка
  development: {
    baseURL: "http://localhost:3001/api",
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000,
    enableMock: true, // Включаем мок данные
    enableNetworkSimulation: false, // Отключаем имитацию ошибок для стабильности
  },

  // Продакшн
  production: {
    baseURL: process.env.REACT_APP_API_URL || "https://api.yourstore.com/api",
    timeout: 15000,
    retryAttempts: 2,
    retryDelay: 2000,
    enableMock: false, // Отключаем мок данные
    enableNetworkSimulation: false, // Отключаем имитацию
  },

  // Тестирование
  test: {
    baseURL: "http://localhost:3001/api",
    timeout: 5000,
    retryAttempts: 1,
    retryDelay: 500,
    enableMock: true,
    enableNetworkSimulation: false,
  },
};

// Получаем текущее окружение
const environment = process.env.NODE_ENV || "development";

// Экспортируем конфигурацию для текущего окружения
export const apiConfig = config[environment];

// Дополнительные настройки
export const apiSettings = {
  // Заголовки по умолчанию
  defaultHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Настройки кэширования
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 минут
    maxSize: 100, // Максимум 100 элементов
  },

  // Настройки логирования
  logging: {
    enabled: process.env.NODE_ENV === "development",
    level: process.env.NODE_ENV === "development" ? "debug" : "error",
  },

  // Настройки повторных попыток
  retry: {
    enabled: true,
    maxAttempts: apiConfig.retryAttempts,
    delay: apiConfig.retryDelay,
    backoff: "exponential", // exponential или linear
  },
};

// Утилиты для работы с API
export const apiUtils = {
  // Формирование полного URL
  buildURL(endpoint) {
    return `${apiConfig.baseURL}${endpoint}`;
  },

  // Проверка, включены ли мок данные
  isMockEnabled() {
    return apiConfig.enableMock;
  },

  // Проверка, включена ли имитация сети
  isNetworkSimulationEnabled() {
    return apiConfig.enableNetworkSimulation;
  },

  // Получение настройки по ключу
  getSetting(key) {
    return apiConfig[key];
  },
};

export default apiConfig;
