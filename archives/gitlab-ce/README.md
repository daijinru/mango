It is recommended to build it because of unstable network.

## Preparations
```bash
# add this below: export GITLAB_HOME=$HOME/gitlab
$ vi ~/.zshrc
# don't forget
$ source ~/.zshrc
```

## Pull docker image
```bash
$ docker pull gitlab/gitlab-ce:latest
```

## Creating container
see [docker-compose](./docker-compose.yml)

after `docker-componse up -d` can try the commands below:
```bash
# track container starting
$ sudo docker logs -f gitlab
# set initial root password which will auto delete after 24hr
$ sudo docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```

### If SSH or HTTP addr is incorrect while Recreating Gitlab

```bash
$ docker exec -it gitlab /bin/bash
$ vi /etc/gitlab/gitlab.rb
```

Modify follow two config when your IP is 192.168.1.**,

1. `gitlab_rails['gitlab_ssh_host'] = '192.168.1.**'`
2. `external_url 'http://192.168.1.**:8082'`

and:

```bash
$ gitlab-ctl reconfigure
$ gitlab-ctl restart
```

