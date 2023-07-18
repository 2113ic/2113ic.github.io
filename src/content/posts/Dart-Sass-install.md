---
title       : 'Dart Sass 安装过程的小坑'
date        : '2023-7-18'
tags        : ['sass', '笔记']
publish     : 'sass'
description : '偶然发现官方已经不再支持 Ruby sass 了，改用了安装更方便、速度更快的 Dart Sass 和 LibSass。我啪的一下，很快啊……'
---

## 前言

今天偶然发现官方已经不再支持 Ruby sass 了，改用了安装更方便、速度更快的 Dart Sass 和 LibSass。

传送门：<https://sass-lang.com/ruby-sass/>

我啪的一下，很快就卸载了 Ruby。

接着安装 Dart Sass 也很顺利，直接解压到常用的安装路径，并且在高级设置里设置可执行文件目录的路径即可。

传送门：<https://github.com/sass/dart-sass/releases>

## 坑

在 Git Bash 中使用 `sass --version` 居然显示找不到命令。而在 CMD 中却是正常地输出了 sass 版本。

```sh
$ sass --version
# bash: sass: command not found
```

一番查找原因，发现 Dart Sass 安装目录下面只有 sass.bat。然而在 git bash 中需要写完整才能执行。

也就是说：

```sh
$ sass.bat --version
# 1.63.6
```

这样才能正常工作。

## 解决方案

方法一：

为 sass.bat 起一个别名。

```sh
alias sass="sass.bat"
```

方法二：

把 sass.bat 文件转为 .sh 文件。

步骤：

1. 找到 sass.bat 文件所在位置
2. 然后新建一个文件，文件名改成 sass（不需要后缀）
3. 然后把下面已经转换为 bash 的代码复制进 sass 文件：

    ```sh
    #!/bin/bash
    # This script drives the standalone dart-sass package, which bundles together a
    # Dart executable and a snapshot of dart-sass.

    SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
    arguments="$@"
    "$SCRIPTPATH/src/dart.exe" "$SCRIPTPATH/src/sass.snapshot" "$arguments"
    ```

4. 保存
5. 在 sass.bat 文件所在位置，打开命令行，执行 `chmod +x sass` 命令。
6. 然后执行 `sass --version` 命令测试是否正确输出版本信息。

下面是 GPT 对 `chmod` 命令的解释：

`chmod` 是一个命令，用于更改文件的权限。在这种情况下，`+x` 参数表示要为文件添加可执行权限。具体解释如下：

- `+x`：表示添加可执行权限。
- `-x`：表示删除可执行权限。
- `u`：表示文件的所有者。
- `g`：表示文件所属组。
- `o`：表示其他用户。
- `a`：表示所有用户（包括所有者、所属组和其他用户）。

因此，`chmod +x sass` 命令将为文件 sass 添加可执行权限，使得该文件可以作为可执行程序在终端中运行。

需要注意的是，只有具有可执行权限的脚本或可执行文件才能在终端中直接执行。通过运行 `chmod +x sass` 命令，您为文件添加了可执行权限，使得在 Git Bash 中可以直接运行 sass 命令。
