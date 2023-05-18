.PHONY: up
up:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose stop

.PHONY: down
down:
	docker-compose down -v

.PHONY: install
install:
	docker-compose run --rm node npm install

.PHONY: update
update:
	docker-compose run --rm node npm update

.PHONY: build
build:
	docker-compose run --rm node npm run build

.PHONY: test
test:
	docker-compose run --rm node npm test

.PHONY: audit
audit:
	docker-compose run --rm node npm audit

.PHONY: audit-fix
audit-fix:
	docker-compose run --rm node npm audit fix
