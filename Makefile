DCOMPOSE = docker-compose

.PHONY: dev down clean restart frontend backend db-up db-down db-shell db-clean

# Команда dev устанавливает зависимости локально (чтобы node_modules были на хосте) и поднимает все контейнеры
dev:
	@echo "Установка зависимостей локально..."
	pnpm install --filter ./backend
	pnpm install --filter ./frontend
	@echo "Поднимаем контейнеры..."
	$(DCOMPOSE) up --build -d

# Остановка всех контейнеров
down:
	$(DCOMPOSE) down

# Очистка node_modules и dist, а также остановка контейнеров с удалением volumes
clean:
	rm -rf frontend/node_modules frontend/dist
	rm -rf backend/node_modules backend/dist
	$(DCOMPOSE) down -v

# Перезапуск
restart: clean dev

# Отдельно поднимаем фронтенд
frontend:
	$(DCOMPOSE) up --build -d frontend

# Отдельно поднимаем бэкенд
backend:
	$(DCOMPOSE) up --build -d backend

# Логи
logs:
	$(DCOMPOSE) logs -f

# Работа с базой данных
db-up:
	$(DCOMPOSE) up -d postgres

db-down:
	$(DCOMPOSE) stop postgres

db-shell:
	$(DCOMPOSE) exec postgres psql -U $$POSTGRES_USER -d $$POSTGRES_DB

db-clean:
	$(DCOMPOSE) down -v postgres
