## network

if curl 0.0.0.0 or other ip failed
```bash
$ docker network create gitlab-network
$ docker network connect gitlab-network gitlab
$ docker network connect gitlab-network gitlab-runner
```
