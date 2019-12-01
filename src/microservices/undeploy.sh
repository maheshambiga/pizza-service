#deployments
kubectl delete deploy/common-mongodb-database-deployment
kubectl delete deploy/auth-api-deployment
kubectl delete deploy/user-api-deployment
kubectl delete deploy/pizza-api-deployment

#services
kubectl delete svc/common-mongodb-database-service
kubectl delete svc/auth-api-service
kubectl delete svc/user-api-service
kubectl delete deploy/pizza-api-service