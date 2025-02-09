FROM node:18-alpine

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

# Устанавливаем рабочую директорию в корне монорепозитория
WORKDIR /app

# Отключаем интерактивный режим (CI)
ENV CI=true

# Копируем корневые файлы для установки зависимостей
COPY package*.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Копируем все файлы монорепозитория
COPY . .

# Переходим в папку backend
WORKDIR /app/backend

# Устанавливаем зависимости в backend (pnpm увидит рабочее пространство)
RUN pnpm install --frozen-lockfile

EXPOSE 5000

CMD ["pnpm", "run", "dev"]
