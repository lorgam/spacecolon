ifneq ($(shell docker compose version 2>/dev/null),)
  DOCKER_COMPOSE=docker compose
else
  DOCKER_COMPOSE=docker-compose -f compose.yaml
endif

.PHONY: up
up:
	$(DOCKER_COMPOSE) up -d

.PHONY: stop
stop:
	$(DOCKER_COMPOSE) stop

.PHONY: down
down:
	$(DOCKER_COMPOSE) down -v

.PHONY: install
install:
	$(DOCKER_COMPOSE) run --rm node npm install

.PHONY: update
update:
	$(DOCKER_COMPOSE) run --rm node npm update

.PHONY: build
build:
	$(DOCKER_COMPOSE) run --rm node npm run build

.PHONY: test
test:
	$(DOCKER_COMPOSE) run --rm node npm test

.PHONY: audit
audit:
	$(DOCKER_COMPOSE) run --rm node npm audit

.PHONY: audit-fix
audit-fix:
	$(DOCKER_COMPOSE) run --rm node npm audit fix
