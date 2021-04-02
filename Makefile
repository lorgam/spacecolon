.PHONY: install
install:
	docker-compose run node npm install

.PHONY: build
build:
	docker-compose run node npm run build

.PHONY: test
test:
	docker-compose run node npm test
