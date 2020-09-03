To run in kubernetes

Start deployments and services (any changes, images will need to be republished to Docker Hub)
    make apply-all

To navigate to the Ingress Controller routes, view ingress-service.yml, the route should be (posts.com)
FYI, etc/hosts file needs to be modified to trick kubernetes to route this URL
127.0.0.1 posts.com

