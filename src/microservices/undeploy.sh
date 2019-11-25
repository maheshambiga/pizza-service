#deployments
kubectl delete deploy/mongodb
kubectl delete deploy/auth-api-deployment
kubectl delete deploy/user-api-deployment

#services
kubectl delete svc/mongodb
kubectl delete svc/auth-api-service
kubectl delete svc/user-api-service