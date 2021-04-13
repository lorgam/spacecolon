.PHONY: up
up:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose stop

.PHONY: install
install:
	docker-compose run node npm install

.PHONY: update
update:
	docker-compose run node npm update

.PHONY: build
build:
	docker-compose run node npm run build

.PHONY: test
test:
	docker-compose run node npm test
