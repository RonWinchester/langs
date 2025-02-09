FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

ENV CI=true

COPY package*.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY . .

WORKDIR /app/frontend

RUN pnpm install --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
