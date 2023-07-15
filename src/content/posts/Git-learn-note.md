---
title       : '我的Git学习笔记'
date        : '2023-4-28'
tags        : ['git']
publish     : 'git'
description : '狂写代码一时爽，git commit 火葬场。经历两次丢失代码的痛苦后，我决定要好好学习一下git……'
---

git 是一种源码管理系统（source code management，缩写为 SCM）。它对当前文件提供版本管理功能，核心思想是对当前文件建立一个对象数据库，将历史版本信息存放在这个数据库中。

## 目录

## git 安装

1. 安装 git

   [官网下载地址](https://git-scm.com/)

   在终端中执行 `git --version` 命令，如果显示 git 的版本说明安装成功。

2. 提交用户名和电子邮件

   这些信息将作为提交者信息显示在更新历史中。

   ```sh
   git config --global user.name 'you'
   git config --global user.email 'you@gmail.com'
   ```

   | 选项       | 说明                     |
   | ---------- | ------------------------ |
   | `--global` | 表示全局设置用户名或邮箱 |

   - 注意：`user.email` 应该填写你 GitHub 的 email，否则 GitHub 无法识别是哪个用户，该 commit 也不会记录在你空间的活动表中。
   - 注意：如果不添加 `--global` 那么将设置为当前项目的配置，你可以在 .git 文件夹的 config 文件中看到你的配置。

   git 的全局设定被存放在用户本地目录的 .gitconfig 文件里，也可以直接编辑该配置文件。

   ```
   [user]
     name = you
     email = you@gmail.com
   ```

3. 查看当前项目的配置信息

   ```sh
   # 查看所有配置信息
   git config --list
   
   # 查看用户名
   git config user.name
   
   #查看电子邮件
   git config user.email
   ```

   添加 `–-global` 将查看全局的配置信息。

## git 基本概念

**工作区**：

工作区也称“工作树”，是实际被操作的目录，可以理解为实际项目的目录。

**暂存区**：

暂存区也称“索引”，是为了向数据库提交作准备的区域。Git 在执行提交的时候，不是直接将工作区的更改直接保存到数据库，而是将暂存区的更改保存到数据库。

将工作区的更改添加到暂存区之后，就意味着该文件已被“跟踪”。

**数据库**：

git 的数据库为两种：

- 远程数据库：配有专用的服务器，为了多人共享而建立的数据库。
- 本地数据库：为了方便用户个人使用，在自己的机器上配置的数据库。

通常的 `git commit` 操作是将更改提交到本地数据库，而 `git push` 则是将更改提交到远程数据库。

**分支**：

分支是为了将修改记录的整体流程分叉保存。分叉后的分支不受其他分支的影响，所以在同一个数据库里可以同时进行多个修改。

一个项目一般会建立多个分支。例如：当功能分支或修复 bug 的分支写好后可以合并分支到主分支中。

注意：在本地创建项目 git 会创建一个名为 master 的分支（如果是在GitHub创建的仓库会是 main 的分支）。因此之后的提交，在切换分支之前都会添加到 master 分支里。

## git 操作流程

1. 初始化一个 git 仓库

   ```sh
   git init
   ```

2. 查看当前仓库状态

   ```sh
   git status
   ```

3. 将文件从工作区添加到暂存区

   ```sh
   git add [file1] [file2] ...
   ```

4. 将暂存区的文件提交到本地代码仓库

   ```sh
   git commit -m [message]
   ```

5. 查看提交 commit 的信息

   ```sh
   git log
   ```

6. 添加远程指针

   ```sh
   git add remote origin <url>
   ```

7. 将本机的 master 分支推送到远程 origin 主机

   ```sh
   git push -u origin master
   ```

8. 将远程主机 origin 的代码取回本地，与本地的 master 分支合并

   ```sh
   git pull origin master
   ```

9. 比较当前分支和上一次 commmit 的差异

   ```sh
   git diff HEAD
   ```

## git 基本操作

### 增加

```sh
# 添加指定文件到暂存区
git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
git add [dir]

# 添加当前目录的所有文件到暂存区
git add .
```

| 选项 | 说明                         |
| ---- | ---------------------------- |
| `-u`   | 只添加已提交过的文件到暂存区 |
| `-p`   | 只添加文件修改的其中一部分   |
| `-i`   | 用对话的形式显示添加在暂存区 |

### 删除

```sh
# 删除指定文件，并把这次删除放入暂存区
git rm [file1] [file2]

# 停止跟踪指定文件，但该文件会保留在工作区
git rm --cached [file]

# 改名，并放入暂存区
git mv [file-original] [file-renamed]
```

| 选项       | 说明     |
| ---------- | -------- |
| `--cached` | 停止跟踪 |

### 提交

```sh
# 提交暂存区到本地仓库
git commit -m [message]

# 提交暂存区指定的文件到本地仓库
git commit [file1] [file2] ... -m [message]

# 如果代码没有任何新变化，则改写上一次commit的提交信息
git commit --amend -m [message]

# 重做上一次commit，并指定文件的新变化
git commit --amend <file1> <file2> ... -m [message]
```

| 选项      | 说明                                   |
| --------- | -------------------------------------- |
| `-a`        | 直接提交所有工作区、暂存区未提交的更改 |
| `-m`        | 指定提交 `[message]` 里的信息          |
| `-v`        | 提交时显示所有 diff 信息               |
| `--amend` | 改写提交                               |

### 分支

1. 查看分支

   ```sh
   # 列出所有本地分支
   git branch
   ```

   | 选项 | 说明             |
   | ---- | ---------------- |
   | `-r`   | 列出所有远程分支 |
   | `-a`   | 列出所有分支     |

2. 创建分支

   ```sh
   # 新建分支，但依然停留在当前分支
   git branch [new-branch-name]
   
   # 将当前分支重命名
   git branch -m [new-branch-name]
   
   # 新建分支，指向指定 commit
   # [commit] 是要将新分支指向的提交记录的哈希值、分支名或者是其他引用名称。
   # 如果不指定，则默认是当前所在的提交记录。
   git branch [new-branch-name] [commit]
   
   # 新建分支，与指定的远程分支建立跟踪关系
   git branch --track [new-branch-name] [remote-branch]
   
   # 在现有分支与指定的远程分支之间，建立跟踪关系
   git branch -u [branch-name] [remote-branch]
   ```

   | 选项    | 说明                                               |
   | ------- | -------------------------------------------------- |
   | `--track` | 创建一个新的本地分支，并将其与远程分支建立跟踪关系 |
   | `-u`      | 设置跟踪关系                                       |
   | `-m`      | 重命名分支                                         |

3. 切换分支

   ```sh
   # 切换到指定分支，并更新工作区
   git checkout [branch-name]
   
   # 新建一个分支，指向某个 tag
   git checkout -b [branch-name] [tag]
   ```

   | 选项 | 说明                         |
   | ---- | ---------------------------- |
   | `-b`   | 新建一个分支，并切换到该分支 |

4. 合并分支

   ```sh
   # 合并指定分支到当前分支
   git merge [branch-name]
   
   # 选择一个 commit，合并进当前分支
   git cherry-pick [commit]
   ```

5. 删除分支 

   ```sh
   git branch -d [branch-name]
   
   # 删除远程分支
   git push origin -d [branch-name]
   # 从本地仓库的跟踪分支列表中删除指定的远程分支
   # 不会影响远程分支
   git branch -dr <remote/branch-name>
   ```
   
   | 选项 | 说明                                 |
   | ---- | ------------------------------------ |
   | `-d`   | 用于删除指定的本地分支或远程跟踪分支 |
   | `-r`   | 用于指定要删除的远程跟踪分支         |
   | `-D`   | 强制删除分支，不管有没有合并更改     |

### 标签

1. 查看

   ```sh
   # 列出所有 tag
   git tag
   
   # 查看 tag 信息
   git show [tag]
   ```

2. 新建 tag

   ```sh
   # 新建一个 tag 在当前 commit
   git tag [tag]
   
   # 新建一个 tag 在指定 commit
   git tag [tag] [commit]
   ```

3. 删除 tag

   ```sh
   git tag -d [tag]
   ```

4. 提交 tag

   ```sh
   # 提交指定 tag 到远程仓库
   git push [remote] [tag]
   ```

   | 选项   | 说明         |
   | ------ | ------------ |
   | `--tags` | 提交所有 tag |

### 查看信息

1. 基础操作

   ```sh
   # 显示所有文件的变更状态
   git status
    
   # 显示当前分支的最近几次提交
   git reflog
    
   # 显示当前分支的版本历史
   git log
    
   # 显示 commit 历史，以及每次 commit 发生变更的文件
   git log --stat
    
   # 显示某个文件的版本历史，包括文件改名
   git log --follow [file]
    
   # 显示指定文件相关的每一次 diff
   git log -p [file]
    
   # 显示指定文件是什么人在什么时间修改过
   git blame [file]
   ```

   | 选项  | 说明                           |
   | ----- | ------------------------------ |
   | `--stat` | 列出每个提交的文件更改统计信息 |
   | `-p` | 显示每个提交中某文件的详细更改内容 |
   | `--follow` | 跟踪某文件的重命名和移动操作 |

2. diff 操作

   ```sh
   # 比较暂存区和工作区的差异
   git diff
   
   # 比较暂存区和上一个 commit 的差异
   git diff --cached
   
   # 比较暂存区和上一个 commit 的特定文件的差异
   git diff --cached [file]
   
   # 比较工作区与当前分支最新 commit 之间的差异
   git diff HEAD
   
   # 比较两个分支/提交之间的差异
   git diff [branch1/commit1]...[branch2/commit2] # ①
   ```

   - 注意：①这个命令中的三个点号（`...`）是必须的，它们表示比较的方向，即从左往右比较 `branch1` 和 `branch2`，从右往左比较 `branch2` 和 `branch1`，然后将两次比较的结果合并起来输出。
   - 注意：①这个命令只会输出差异信息，并不会将这些差异合并到任何一个分支中。如果需要将差异合并到某个分支中，需要使用 `git merge` 命令或其他合并命令。


3. show 操作

   ```sh
   # 显示某次提交的元数据和内容变化
   git show [commit]
   
   # 显示某次提交发生变化的文件
   git show --name-only [commit]
   
   # 显示某次提交时，某个文件的内容
   git show [commit]:[filename]
   ```

### 远程

- 查看

  ```sh
  # 显示所有远程仓库
  git remote -v

  # 显示某个远程仓库的信息
  git remote show [remote]

  # 下载远程仓库的所有变动
  git fetch [remote]
  ```

- 新建远程仓库

  ```sh
  # 增加一个新的远程仓库，并命名
  git remote add [shortname] [url]
  ```

- 克隆远程仓库

  ```sh
  # 克隆远程仓库
  # [dir] 为指定新目录的名称，默认为远程仓库的名称
  git clone <repository-url> [dir]
  ```

- push 操作

  ```sh
  # 上传本地指定分支到远程仓库，不指定则默认为当前分支
  git push [remote] [branch]
  ```

  | 选项    | 说明                                   |
  | ------- | -------------------------------------- |
  | `--force` | 强行推送当前分支到远程仓库，即使有冲突 |
  | `--all`   | 推送所有分支到远程仓库                 |

- pull 操作

  ```sh
  # 取回远程仓库的变化，并与本地分支合并
  git pull [remote] [branch]
  ```

### 撤销

1. checkout操作

   ```sh
   # 恢复暂存区的指定文件到工作区
   git checkout [file]
   
   # 恢复某个 commit 的指定文件到工作区
   git checkout [commit] [file]
   
   # 恢复上一个 commit 的所有文件到工作区
   git checkout .
   ```

2. reset 操作

   ```sh
   # 重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变
   git reset [file]
   
   # 重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变
   git reset [commit]
   
   # 重置暂存区与工作区，如果没有指定 commit，则默认与上一次 commit 保持一致
   git reset --hard [commit]
   ```
   
   | 选项 | 说明 |
   | ---- | ---- |
   | `--hard`   | 重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致 |
   | `--keep` | 重置当前 HEAD 为指定 commit，但保持暂存区和工作区不变 |
   
   注意：使用 `--hard` 之前请备份未提交的更改，否则会导致未提交的更改**永久丢失**！
   
3. revert 操作

   ```sh
   # 新建一个 commit，用来撤销指定 commit
   # 后者的所有变化都将被前者抵消，并且应用到当前分支
   git revert [commit]
   ```

### 其他

```sh
# 生成一个可供发布的压缩包
git archive
```

## 参考

- wangdoc/git-tutorial：https://github.com/wangdoc/git-tutorial

- 猴子都能懂的Git教程：https://backlog.com/git-tutorial/cn/
