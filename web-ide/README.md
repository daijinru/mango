## docker container

Docker image
```bash
$ docker pull codercom/code-server
```

and docker container
```bash
$ mkdir -p ~/.config
$ docker run -it --name code-server -p 127.0.0.1:8080:8080 \
  -v "$HOME/.config:/home/coder/.config" \
  -v "$PWD:/home/coder/project" \
  -u "$(id -u):$(id -g)" \
  -e "DOCKER_USER=$USER" \
  codercom/code-server:latest
```

see this file for password of the service
```bash
$ cat ~/.config/code-server/config.yml
```
