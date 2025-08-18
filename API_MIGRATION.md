# Миграция с Mock API на Real API

## Текущее состояние

Приложение настроено для работы с mock API, который имитирует реальные сетевые вызовы. Все данные хранятся локально в файле `src/data/products.js`.

## Структура API

### Файлы

- `src/services/api.js` - Основной API сервис
- `src/hooks/useAPI.js` - React хуки для работы с API
- `src/config/api.js` - Конфигурация API для разных окружений
- `src/data/products.js` - Локальные данные продуктов

### Основные методы API

- `productsAPI.getAll()` - Получить все продукты
- `productsAPI.getById(id)` - Получить продукт по ID
- `productsAPI.search(query)` - Поиск продуктов
- `productsAPI.getPaginated(page, limit)` - Пагинация продуктов

## Переход на Real API

### 1. Настройка окружения

Создайте файл `.env` в корне проекта:

```bash
# Разработка
REACT_APP_API_URL=http://localhost:3001/api

# Продакшн
REACT_APP_API_URL=https://api.yourstore.com/api
```

### 2. Замена mock данных на реальные API вызовы

В файле `src/services/api.js` замените комментарии TODO на реальные fetch вызовы:

```javascript
// Вместо этого:
// TODO: Заменить на реальный API вызов
// const response = await fetch(apiUtils.buildURL('/products'));
// return response.json();

// Используйте это:
const response = await fetch(apiUtils.buildURL("/products"), {
  method: "GET",
  headers: apiSettings.defaultHeaders,
});
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
return response.json();
```

### 3. Настройка CORS на сервере

Убедитесь, что ваш сервер разрешает запросы с вашего домена:

```javascript
// Express.js пример
app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourstore.com"],
    credentials: true,
  })
);
```

### 4. Обработка ошибок

Добавьте обработку различных HTTP статусов:

```javascript
const handleResponse = async (response) => {
  if (response.ok) {
    return response.json();
  }

  switch (response.status) {
    case 404:
      throw new Error("Resource not found");
    case 401:
      throw new Error("Unauthorized");
    case 403:
      throw new Error("Forbidden");
    case 500:
      throw new Error("Server error");
    default:
      throw new Error(`HTTP error! status: ${response.status}`);
  }
};
```

### 5. Аутентификация

Добавьте токены аутентификации в заголовки:

```javascript
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// В API вызовах:
headers: {
  ...apiSettings.defaultHeaders,
  ...getAuthHeaders()
}
```

## Структура API endpoints

### Продукты

```
GET /api/products - Получить все продукты
GET /api/products/:id - Получить продукт по ID
GET /api/products/search?q=query - Поиск продуктов
GET /api/products?page=1&limit=12 - Пагинация
GET /api/products/category/:category - Продукты по категории
```

### Корзина

```
GET /api/cart - Получить корзину
POST /api/cart - Добавить в корзину
PUT /api/cart/:id - Обновить количество
DELETE /api/cart/:id - Удалить из корзины
```

### Пользователи

```
POST /api/auth/login - Вход
POST /api/auth/logout - Выход
GET /api/auth/profile - Профиль пользователя
```

## Тестирование

### 1. Локальное тестирование

```bash
# Запуск mock API
npm run start:mock

# Запуск с реальным API
REACT_APP_API_URL=http://localhost:3001/api npm start
```

### 2. Переключение между mock и real API

```javascript
// В config/api.js
development: {
  enableMock: process.env.REACT_APP_USE_MOCK === 'true',
  enableNetworkSimulation: process.env.REACT_APP_SIMULATE_NETWORK === 'true',
}
```

## Мониторинг и логирование

### 1. Логирование API вызовов

```javascript
if (apiSettings.logging.enabled) {
  console.log(`API Call: ${operation}`, { args, response });
}
```

### 2. Метрики производительности

```javascript
const measurePerformance = async (operation, apiCall) => {
  const start = performance.now();
  try {
    const result = await apiCall();
    const duration = performance.now() - start;
    console.log(`${operation} took ${duration}ms`);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`${operation} failed after ${duration}ms`, error);
    throw error;
  }
};
```

## Безопасность

### 1. Валидация данных

```javascript
const validateProduct = (product) => {
  if (!product.title || !product.price) {
    throw new Error("Invalid product data");
  }
  return product;
};
```

### 2. Санитизация входных данных

```javascript
import DOMPurify from "dompurify";

const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input);
};
```

## Развертывание

### 1. Production build

```bash
npm run build
```

### 2. Environment variables

```bash
REACT_APP_API_URL=https://api.yourstore.com/api npm run build
```

### 3. Проверка конфигурации

```javascript
// В production должен быть:
console.log("API Config:", apiConfig);
// { baseURL: 'https://api.yourstore.com/api', enableMock: false, ... }
```

## Troubleshooting

### Частые проблемы

1. **CORS ошибки** - Проверьте настройки сервера
2. **404 ошибки** - Проверьте правильность endpoints
3. **Timeout ошибки** - Увеличьте timeout в конфигурации
4. **Аутентификация** - Проверьте токены и заголовки

### Отладка

```javascript
// Включите детальное логирование
localStorage.setItem("debug", "api:*");

// Проверьте конфигурацию
console.log("API Config:", apiConfig);
console.log("Environment:", process.env.NODE_ENV);
```
