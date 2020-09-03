deploy: docker-deploy
apply-all: k8s-apply-all
delete-all: k8s-delete-all
restart-deploy: restart-deploy-k8-docker

docker-deploy:
	docker-compose build && docker-compose push

k8s-apply-all: 
	kubectl apply -f ./infra/k8s/.

k8s-delete-all: 
	kubectl delete -f ./infra/k8s/.

restart-deploy-k8-docker:
	$(MAKE) docker-deploy
	$(MAKE) k8s-delete-all
	$(MAKE) k8s-apply-all

.PHONY: docker-deploy k8s-apply-all k8s-delete-all