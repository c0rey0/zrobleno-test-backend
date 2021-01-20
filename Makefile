help:
	@echo "usage: make COMMAND [c=[arguments]]"
	@echo ""
	@echo "  up               Up all docker services"
	@echo "  down             Stop all docker services"
	@echo "  dps              Show all running containers"
	@echo "  up-build         Up docker services with --build param"
	@echo "  db-refresh       Refresh current DB"
	@echo "  db-up            Up new migration"
	@echo "  db-down          Down new migration"

# Show all running containers
dps:
	@docker ps --format "table {{.ID}}\t{{.Ports}}\t{{.Names}}"

# Up docker environment
up:
	docker-compose up -d
	make dps

# Build and up docker environment
up-build:
	docker-compose up -d --build
	make dps

# Down docker environment
down:
	docker stop $(shell docker ps -a -q)

# Refresh current DB
db-refresh:
	@npx knex migrate:rollback --all
	@npx knex migrate:latest
	@npx knex seed:run

# Up new migration
db-up:
	@node_modules/.bin/knex migrate:latest

# Down new migration
db-down:
	@node_modules/.bin/knex migrate:rollback

# preccomit command
precommit:
	@npx knex migrate:rollback
	@npx knex migrate:latest
	@npx knex seed:run
	@yarn run precommit
