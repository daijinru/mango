```bash
## 切换 zsh
$ cash -s /bin/zsh

## 安装 homebrew
# https://brew.sh/
# 443 错误大概率
# 解决办法
$ /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"

## 安装 wget
$ brew install wget    

## 正文
$ REMOTE=https://gitee.com/mirrors/oh-my-zsh.git sh -c "$(wget https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh -O -)"
```

如果有权限提示
```bash
$ chmod 755 /usr/local/share/zsh
$ chmod 755 /usr/local/share/zsh/site-functions
```
