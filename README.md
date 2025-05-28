# Star Wars Catalog

Приложение-каталог персонажей Star Wars на React + TypeScript + Vite.

## Возможности

-   Список персонажей с фильтрацией и пагинацией
-   Просмотр подробной информации о персонаже в модальном окне
-   Поиск и фильтр по полу
-   Кэширование данных с помощью React Query

## Установка и запуск

1. **Клонируйте репозиторий:**

    ```sh
    git clone https://github.com/gleb-ershov/cr_test
    cd star-wars-catalog
    ```

2. **Установите зависимости:**

    ```sh
    yarn install
    ```

3. **Запустите приложение в режиме разработки:**

    ```sh
    yarn dev
    ```

4. **Откройте в браузере:**
    ```
    http://localhost:5173
    ```

## Сборка для продакшена

```sh
yarn build
```

## Линтинг

```sh
yarn lint
```

## Технологии

-   React 19
-   TypeScript
-   Vite
-   React Router DOM
-   @tanstack/react-query
-   Tailwind CSS
-   Radix UI

---

**Стартовая точка:** [src/main.tsx](src/main.tsx)  
**Маршрутизация:** [src/app/router.tsx](src/app/router.tsx)
