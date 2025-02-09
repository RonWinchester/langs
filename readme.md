
# Документация по работе с Makefile для проекта

Этот проект использует Makefile для удобного управления контейнерами и рабочими процессами с помощью Docker Compose. В данном руководстве описаны доступные команды и их использование.

---

## **Команды Makefile**

### **1. Запуск всех контейнеров**
```bash
make dev
```
Поднимает и запускает все контейнеры с пересборкой.

### **2. Остановка всех контейнеров**
```bash
make down
```
Останавливает и удаляет все активные контейнеры.

### **3. Очистка временных файлов и данных контейнеров**
```bash
make clean
```
Удаляет временные файлы проекта (`node_modules`, `dist` и т.д.), а также останавливает контейнеры и удаляет их тома.

### **4. Пересборка и перезапуск всех контейнеров**
```bash
make restart
```
Полностью пересобирает образы и перезапускает все контейнеры.

### **5. Запуск фронтенда отдельно**
```bash
make frontend
```
Поднимает только контейнер фронтенда без зависимости от бэкенда.

### **6. Запуск бэкенда отдельно**
```bash
make backend
```
Поднимает только контейнер бэкенда.

### **7. Работа с базой данных**

#### Поднять контейнер базы данных
```bash
make db-up
```
Запускает контейнер PostgreSQL.

#### Остановить контейнер базы данных
```bash
make db-down
```
Останавливает контейнер базы данных.

#### Подключиться к базе данных через `psql`
```bash
make db-shell
```
Открывает интерактивную консоль PostgreSQL. Требует правильной настройки переменных окружения (`POSTGRES_USER`, `POSTGRES_DB`).

#### Очистить данные и тома базы данных
```bash
make db-clean
```
Полностью удаляет контейнер базы данных и его тома.

---

## **Дополнительная информация**

- Все команды Makefile автоматизируют рутинные задачи для работы с контейнерами и упрощают разработку.
- Переменные окружения для базы данных должны быть указаны в `.env` файле в корневой директории проекта.
- Убедитесь, что Docker и Docker Compose установлены на вашей системе перед использованием команд.

Пример файла `.env`:
```env
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=myappdb
```

Используйте данный Makefile для эффективного управления проектом и упрощения процессов разработки.


## Основные команды docker-compose

### 🛠 Development
| Команда | Описание |
|---------|-----------|
| `docker-compose up -d` | Запустить все сервисы в фоне |
| `docker-compose up frontend` | Запустить только фронтенд |
| `docker-compose logs -f backend` | Показать логи бэкенда |
| `docker-compose build --no-cache` | Пересобрать образы с очисткой кэша |
| `docker-compose restart backend` | Перезапустить бэкенд |

### 🚀 Production
| Команда | Описание |
|---------|-----------|
| `docker-compose -f docker-compose.prod.yml up -d --build` | Собрать и запустить prod-окружение |
| `docker-compose -f docker-compose.prod.yml down` | Остановить prod-окружение |
| `docker-compose -f docker-compose.prod.yml exec backend pnpm run migrate` | Выполнить миграции БД |

### ⚙ Общие команды
| Команда | Описание |
|---------|-----------|
| `docker-compose ps` | Показать статус контейнеров |
| `docker-compose down` | Остановить и удалить контейнеры |
| `docker-compose down -v --rmi all` | Полная очистка (контейнеры+образы+тома) |
| `docker system prune -a` | Удалить все неиспользуемые Docker-объекты |

## Рабочие порты
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5000](http://localhost:5000)
- **PostgreSQL**: `localhost:5432`

## Важные заметки
1. Перед первым запуском:
```bash
cp .env.example .env
cp .env.prod.example .env.prod