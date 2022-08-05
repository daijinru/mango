
## pre
```bash
# add this below: export GITLAB_HOME=$HOME/gitlab
$ vi ~/.zshrc
# don't forget
$ source ~/.zshrc
```

## docker image
```bash
$ docker pull gitlab/gitlab-ce:latest
```

## container
```bash
$ sudo docker run --detach \
  --hostname gitlab.daijinru.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab \
  --volume $GITLAB_HOME/logs:/var/log/gitlab \
  --volume $GITLAB_HOME/data:/var/opt/gitlab \
  --shm-size 256m \
  gitlab/gitlab-ce:latest
```

```bash
# track container starting
$ sudo docker logs -f gitlab
# set initial root password which will auto delete after 24hr
sudo docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```
