It is recommended to build it because of unstable network.

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
see [docker-compose](./docker-compose.yml)

after `docker-componse up -d` can try the commands below:
```bash
# track container starting
$ sudo docker logs -f gitlab
# set initial root password which will auto delete after 24hr
sudo docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```

## settings

*address of ssh is incorrect*
```bash
# container gitlab
$ cd /opt/gitlab/embedded/service/gitlab-rails/config
$ vi gitlab.yml
# find host value and modify to the current domain name
# eg.
# host: 192.168.*.*
# port: 8082
$ gitlab-ctl restart
```
