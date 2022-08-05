

if install on MacOS
```bash
$ brew install maven
```

替换 /usr/local/Cellar/maven/3.8.4/libexec/conf/settings.xml
或者替换 servers 和 mirrors 内容。

新版本要求 https，需要做 http-blocker 的注释

```bash
export M2_HOME=/Users/daijr/datas/apache-maven-3.8.6
export PATH=$PATH:$M2_HOME/bin
```
