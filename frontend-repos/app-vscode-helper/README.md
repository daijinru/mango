# Mango 微应用开发助手

## 使用指南

确保本地环境已安装 `pnpm` 和 `yarn`：

```bash
$ npm i -g pnpm yarn
```

## 发布

```bash
$ git clone https://github.com/microsoft/vscode-vsce.git
$ cd vscode-vsce && docker build -t vsce .
# 请提前准备 token
$ docker run --rm -it -v "mango/main 分支)":/workspace vsce publish

```