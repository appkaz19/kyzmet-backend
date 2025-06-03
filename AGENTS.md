# AGENTS.md

## setup

- Выполнить `npm install`
- Убедиться, что установлен пакет `yaml`
- Если отсутствует — установить командой: `npm install yaml`

## commands

- Сборка OpenAPI: `npm run build:openapi`

## files

- OpenAPI собирается скриптом: `scripts/combine-openapi.js`
- Команда сборки указана в `package.json`:
  ```json
  "build:openapi": "node scripts/combine-openapi.js"
  ```

## dependencies

- Пакет `yaml` должен быть установлен (`npm install yaml`)
- В `package.json` ранее был только `yamljs`, он не подходит

## commit-style

- Использовать Conventional Commits:
  - `feat(scope): добавлена фича`
  - `fix(scope): исправление`
  - `chore(scope): техническое изменение`
- Примеры:
  - `feat(services): добавлена пагинация`
  - `fix(openapi): добавлен пакет yaml`

## notes

- Агент работает без сетевого доступа — все зависимости должны быть локально
- Для корректной работы `build:openapi` требуется `yaml` в `node_modules`