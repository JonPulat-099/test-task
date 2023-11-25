# testTask

Этот шаблон разработан с помощью Vue 3 в Vite.

## Как установить и запустить проект

- Установка зависимостей

```sh
bun install
```

- Запустите `json-server`

```sh
bun server
```

- Запустите приложение в режиме разработки (перезагрузка горячего кода, отчеты об ошибках и т. д.).

```sh
bun dev
```

- Форматировать файлы

```sh
bun format
```

- Создайте приложение для производства

```sh
bun build
```

- Настройте конфигурацию
  [vite.config.js](https://vitejs.dev/config/)

## Структура директорий

```
📦 test-task
┣ 📂public                  # Этот директория содержит статические файлы.
┃ ┗ 📜favicon.ico
┣ 📂 src                    # Исходный код проекта
┃ ┣ 📂 assets               # Активы, которые будут обработаны сборщиком
┃ ┣ 📂 components           # UI компоненты
┃ ┣ 📂 composables          # Действия, которые несут бизнес-ценность
┃ ┣ 📂 shared               # Переиспользуемый код, не имеющий отношения к специфике приложения
┃ ┃ ┣ 📂api                 # Список всех запросов
┃ ┃ ┗ 📂types               # Список интерфейсы
┃ ┗ 📜 App.vue              # Корневой экземпляр Vue
┃ ┗ 📜 main.ts
┣ 📜 .eslintrc.cjs          # Настройки линтеров
┣ 📜 .gitignore
┣ 📜 .prettierrc.json       # Настройки prettier
┣ 📜 bun.lockb
┣ 📜 db.json                # Мок дата
┣ 📜 env.d.ts
┣ 📜 index.html
┣ 📜 json-server.json       # Конфигурация json-server
┣ 📜 package.json
┣ 📜 README.md
┣ 📜 tsconfig.app.json
┗ 📜 tsconfig.json          # Конфигурация typescript
┣ 📜 tsconfig.node.json
┣ 📜 vite.config.js         # Конфигурация Vite
```
