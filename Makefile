DCOMPOSE = docker-compose

.PHONY: dev down clean restart frontend backend db-up db-down db-shell db-clean

base:
	@docker build -t localhost/pnpm - < Dockerfile

cli:
	@docker run --rm -it -v $(CURDIR):/app -w /app localhost/pnpm sh

backend/node_modules:
	@docker run --rm -it -v $(CURDIR):/app -w /app localhost/pnpm \
		pnpm install --filter ./backend

frontend/node_modules:
	@docker run --rm -it -v $(CURDIR):/app -w /app localhost/pnpm \
		pnpm install --filter ./frontend

prisma/migrate:
	@docker exec -it langs-backend-1 pnpm pmd $(DESCRIPTION)

# make prisma/migrate DESCRIPTION="create_users_table"

prisma/generate:
	@docker exec -it langs-backend-1 pnpm pgc


# Команда dev устанавливает зависимости локально (чтобы node_modules были на хосте) и поднимает все контейнеры
dev: base frontend/node_modules backend/node_modules
	$(DCOMPOSE) up --build -d

stop:
	$(DCOMPOSE) stop

start:
	@$(DCOMPOSE) start
	
# Остановка и удаление всех контейнеров 
down:
	$(DCOMPOSE) down

# Очистка node_modules и dist, а также остановка контейнеров с удалением volumes
clean:
	rm -rf frontend/node_modules frontend/dist
	rm -rf backend/node_modules backend/dist
	rm -rf node_modules
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
