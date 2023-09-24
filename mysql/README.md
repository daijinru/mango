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

## Test

```bash
$ docker logs -f mysql
$ docker exec -it mysql /bin/bash
```