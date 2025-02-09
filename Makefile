DCOMPOSE = docker-compose
FRONT_DIR = ./frontend
BACK_DIR = ./backend

.PHONY: dev down clean restart frontend backend db-up db-down db-shell db-clean

# Запуск всех контейнеров
dev:
	$(DCOMPOSE) up --build -d

# Остановка всех контейнеров
down:
	$(DCOMPOSE) down

# Очистка временных файлов (node_modules, dist и т.д.)
clean:
	rm -rf $(FRONT_DIR)/node_modules $(FRONT_DIR)/dist
	rm -rf $(BACK_DIR)/node_modules $(BACK_DIR)/dist
	$(DCOMPOSE) down -v

# Пересборка и рестарт всех контейнеров
restart: clean dev

# Поднять только фронтенд
frontend:
	$(DCOMPOSE) up --build -d frontend

# Поднять только бэкенд
backend:
	$(DCOMPOSE) up --build -d backend

logs:
	docker-compose logs -f backend

# Работа с базой данных

# Поднять контейнер базы данных
db-up:
	$(DCOMPOSE) up -d postgres

# Остановить контейнер базы данных
db-down:
	$(DCOMPOSE) stop postgres

# Подключиться к базе данных через psql
db-shell:
	$(DCOMPOSE) exec postgres psql -U $$POSTGRES_USER -d $$POSTGRES_DB

# Очистка данных базы (volume reset)
db-clean:
	$(DCOMPOSE) down -v postgres
