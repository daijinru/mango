# MySQL

## Initialize

Add content after create file below:
```bash
$ vi /root/mysql/config/my.cnf
```

```yml
[mysqld]
user=mysql
default-storage-engine=INNODB
character-set-server=utf8
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```

## Starting

```bash
# start container
$ docker-compose up -d
# docker inspect
$ docker logs -f mysql
$ docker exec -it mysql /bin/bash
# if create databases
$ mysql -uroot -p
# and then
$ CREATE DATABASE [database_name]
```

## Connnect Networks

```bash
# Multi Containers in a network
# eg.
$ docker network create local_database
$ docker network connect local_database mysql
```