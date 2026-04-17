DOCKER_COMPOSE = docker-compose
EXEC_BACK = docker exec -it tech_backend

.PHONY: build up down restart logs prisma-gen prisma-migrate db-studio clean

build: ## Build les images
	$(DOCKER_COMPOSE) build

up: ## Lance le projet
	$(DOCKER_COMPOSE) up -d

down: ## Arrête le projet
	$(DOCKER_COMPOSE) down

logs: ## Logs en temps réel
	$(DOCKER_COMPOSE) logs -f

# --- Commandes Prisma ---

prisma-gen: ## Génère le client Prisma
	$(EXEC_BACK) yarn prisma generate

prisma-migrate: ## Lance une nouvelle migration (demande un nom)
	@read -p "Nom de la migration: " name; \
	$(EXEC_BACK) yarn prisma migrate dev --name $$name

db-studio: ## Lance Prisma Studio (accessible sur localhost:5555)
	$(EXEC_BACK) yarn prisma studio

# --- Nettoyage ---

clean: ## Nettoyage complet (images et volumes)
	$(DOCKER_COMPOSE) down -v --rmi all