# Kyzmet Backend

## 📌 Описание

Kyzmet — это сервис по поиску и найму специалистов. Данный репозиторий содержит backend-часть проекта, написанную на Node.js с использованием Express.js. Структура организована по принципу модульности с разделением на контроллеры, сервисы и маршруты.

## ⚙️ Стек технологий

* Node.js
* Express.js
* PostgreSQL
* JWT для авторизации
* Docker & Docker Compose
* OpenAPI (Swagger)

## 🚀 Быстрый старт

### 1. Клонирование и установка зависимостей

```bash
git clone <repo-url>
cd backend
npm install
```

### 2. Настройка переменных окружения

Создайте `.env` файл на основе `.env.example`

### 3. Запуск с Docker

```bash
docker-compose up --build
```

### 4. Инициализация базы данных

```bash
docker exec -it <postgres-container> psql -U <user> -d <db> -f /init-db/init.sql
```

### 5. Настройка Firebase уведомлений

- Заполните переменные `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` и
  `FIREBASE_PRIVATE_KEY` в `.env`. Эти данные можно получить из сервисного
  аккаунта Firebase.
- После получения FCM-токена на клиенте отправьте его запросом `POST
  /users/push-token` с заголовком авторизации `Bearer <jwt>`:

```bash
curl -X POST /users/push-token \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"pushToken": "<FCM_TOKEN>"}'
```

Полученный токен будет использоваться бэкендом для отправки push-уведомлений.

## 📁 Структура проекта

```
src/
 └── api/
      ├── auth/                # Авторизация и аутентификация
      ├── chat/                # Чат между пользователями
      ├── jobs/                # Заявки и заказы
      ├── location/            # Города, география
      ├── notifications/       # Уведомления
      ├── reviews/             # Отзывы
      ├── services/            # Сервисные предложения
      └── ...
```

## 📘 Swagger

Swagger-документация доступна на `/api-docs` после запуска сервера.

## 👥 Участники команды

* Backend Lead: \[Жаксыбаев Даулет]
* DevOps: \[Жаксыбаев Даулет]

## 📄 Лицензия

MIT
