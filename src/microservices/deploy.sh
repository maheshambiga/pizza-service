#common mongo
kubectl apply -f mongodb/service.yml
kubectl apply -f mongodb/deployment.yml
echo "common mongo service and deployment  done successfully.."

#auth api
kubectl apply -f auth/k8s/service.yml
kubectl apply -f auth/k8s/deployment.yml
echo "auth-api service and deployment  done successfully.."

#user api
kubectl apply -f user/k8s/service.yml
kubectl apply -f user/k8s/deployment.yml
echo "user-api service and deployment  done successfully.."

#pizza add, search, update and remove api
kubectl apply -f pizza/k8s/service.yml
kubectl apply -f pizza/k8s/deployment.yml
echo "pizza-api service and deployment  done successfully.."
