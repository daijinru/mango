```bash
## -> zsh
$ cash -s /bin/zsh

## homebrew install
# https://brew.sh/
# 443 error
# how to solve?
$ /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"

## wget install
$ brew install wget

if reported `fatal: not in a git repository`, plz run `brew -v` and follow the prompts.

## oh-my-zsh install on gitee
$ REMOTE=https://gitee.com/mirrors/oh-my-zsh.git sh -c "$(wget https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh -O -)"
```

if some strange console:
```bash
$ chmod 755 /usr/local/share/zsh
$ chmod 755 /usr/local/share/zsh/site-functions
```
