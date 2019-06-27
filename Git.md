# 分布式版本控制工具
## Git优势
1. 大部分操作在本地完成，不需要联网
2. 文件完整性
3. 尽可能添加数据，而不是删除或修改数据
4. 分支操作非常快捷流畅
5. 与Linux命令全面兼容

https://github.com/fanfanbigeye/self-study/blob/master/pictures/10.png
## Git安装
官网下载最新版本：https://git-scm.com/

安装时在Adjusting your PATH environment页面选择Use Git from Bash only

## Git在本地的结构
本地库（历史版本）
暂存区（临时存储）
工作区(写代码)

## Git和代码托管中心
### 局域网环境下
- GitLab服务器

### 外网环境下
- Github
- 码云

# 本地库和远程库
远程库A->远程库B   fork

远程库B->远程库A   pull request->审核->merge


远程库->本地库    clone 
本地库-> 远程库   push

# Git命令行操作
## 本地库初始化
- 命令：git add  

  任意目录下右键->Git Bush here

  ll:   列举当前目录下的资源
  
  cd ..  ：返回上一层目录

  ls -lA:   带隐藏资源
  
  mkdir  :   新建目录
  
  pwd:     显示工作目录
  
  git init:   初始化一个空的Git库（创建了一个隐藏的.git目录）
  
  ll .git/ ： 查看该隐藏目录下文件
  
- 注意：.git目录中存放的是本地库相关的子目录和文件，不能随意修改和删除

## 设置签名
### 形式
用户名：fanfan

Email地址：xlfanfanya@gmail.com

### 作用
区分不同开发人员的身份

### 辨析
这里设置的签名和登录远程库（代码托管中心）的账号、密码没有关系

### 命令
#### 项目级别/仓库级别：仅在当前本地库范围内有效
 
  git **config** ueser.name fanfan_pro

  git **config** ueser.email xlfanfanya_pro@gmail.com
  

#### 系统用户级别：登录当前操作系统的用户范围
  
    git config **--global** ueser.name fanfan_glb

  git config **--global** ueser.email xlfanfanya_glb@gmail.com

  备注：设置的签名信息保存在当前项目的 .git目录下的config文件里
####    cat .git/config   查看文件

- 级别优先级
 1.  就近原则：项目级别先于系统用户级别，二者都存在时采用项目级别
 2. 如果只有系统用户级别的签名，就以系统用户级别的签名为准
 3. 二者都没有不允许

####   git status:  查看工作区、暂存区的状态
 
####  vim good.txt :进入编辑文件
 
 esc键跳到命令模式  ：wq  保存文件并退出vi i：进入编辑
 
出现错误：Another git process seems to be running in this repository, e.g.
an editor opened by 'git commit'. Please make sure all processes
are terminated then try again. If it still fails, a git process
may have crashed in this repository earlier:
remove the file manually to continue.

解决办法：进入项目文件夹下的 .git文件中（显示隐藏文件夹或rm .git/index.lock）删除index.lock文件即可。

####  git add good.txt:  把文件添加到暂存区
 
####  git commit good.txt:  提交到本地库

####  git commit -m "My second commit,modify good.txt" good.txt  简单的提交修改方式

#### 版本的前进后退（基于索引值操作）
- git reflog：查看索引值
- git reset --hard 索引值：往后退
- git reset --hard su

#### 删除文件并找回

-  rm bbb.txt：      删除bbb.txt文件

  前提：想找回来删除前的文件，必须把文件存在时的状态提交到本地库

  操作：git reset --hard [指针位置]
  1.删除操作已经提交到本地库：指针位置指向历史记录
  2.删除操作未提交到本地库，指针位置使用HEAD
  
####   比较文件
- git diff [文件名] :将工作区的文件和暂存区进行比较
- git diff [本地库历史版本] [文件名]:将工作区的文件和本地库历史记录比较
-不带文件名比较多个文件

#### 分支操作
- git branch -v:    查看分支
- git branch hot_fix:   创建分支hot_fix
-  git checkout hot_fix：  切换到hot_fix分支

#### 合并分支
- 第一步：切换到接受修改的分支上（被合并，增加新内容）git checkout master
- 第二步：执行merge命令  git merge hot_fix

#### 解决冲突

如果两个分支上的文件都被修改，合并可能会出现冲突，需要手动合并

- 冲突的表现
  
   文件中会有特殊符号乱码，变现为当前分支的内容以及另一分支的内容

- 冲突的解决

   第一步：编辑文件，删除特殊符号，把文件修改到满意的程度，保存退出
   
   第二步：git add[文件名]
   
   第三步：git commit -m "日志信息"
   
   注意：第三步不能再带文件名
   
# Git基本原理
## 哈希  
明文---------加密算法---------密文

哈希是一个系列的加密算法，各个不同的哈希算法虽然加密强度不同，但是有以下几个共同点：

1.不管输入数据的数据量有多大，输入同一个哈希算法，得到的加密结果长度固定

2.哈希算法确定，输入数据确定，输出数据能保证不变

3.哈希算法确定，输入数据变化，输出数据一定有变化，而且通常变化很大

4.哈希算法不可逆

Git底层采用的是SHA-1算法

哈希算法可以被用来验证文件

原始文件---->SHA-1----->2f9adhsdjgsfg35430nfdsjhjk

网络传输           比对--->不一致---->目标文件损坏

目标文件---->SHA-1----->dbhsdfgjkshflsfjdlshdsjh

Git 就是靠这种原理来保证数据的完整性

## Git保存版本的机制
### 集中式版本控制工具的文件管理机制

以文件变更列表的方式存储信息，这类系统将它们保存的信息看作是一组基本文件和每个文件随时间逐步累积的差异。

### Git的文件管理机制
Git把数据看作是小型文件系统的一组快照，每次提交更新时Git都会对当前的全部文件制作一个快照并且保存这个快照的索引，为了高效，如果文件没有修改，Git不再重新存储该文件，而是只保留一个链接指向之前存储的文件，所以Git的工作方式可以称之为快照流。

### Git文件管理机制细节
#### Git的”提交对象“
父节点  

Git分支的管理的本质是创建和移动指针

# Git和GitHub

## 注册Github账号

## 创建本地库

- mkdir huashan
- cd huashan
- git init
- vim huashanjianfa.txt
- git add huashanjianfa.txt
-  git commit -m "test github" huashanjianfa.txt

## 创建远程库
- 登录github账号
- 点击+号，选择new repository
- 仓库名与本地库名一样用huashan
- 点击创建

## 本地创建远程库地址别名
- 登录github，点击创建的远程库，复制HTTPS地址
- Git本地保存以上复制的HTTPS地址，命令为 git remote add origin [地址]    用origin代替地址
- git remote -v:查看远程库地址

## 推送操作
- git push origin master
- 弹出github登录页面，填写用户名和密码
- 刷新github页面可看到推送内容

## 克隆操作
- cd ..：  退出本地库文件夹，返回上一级别
- mkdir xback
- cd xback
- 进入github,点击Clone or Download复制HTTPS地址
- git clone [地址]
- cd huashan
- ll   :可以看到本地库已经有克隆的文件了，并且.git文件也配置好了
- git remote -v   ：远程的HTTPS地址已经替换好

## 邀请其他人（xback）加入团队（huashan的团队）
-  vim huashanjianfa.txt  ：克隆下来的本地库修改文件
-  git add huashanjianfa.txt
-  git commit -m "test push" huashanjianfa.txt   ：提交到本地库
-  进入远程仓库，settings--->Collaborators---填写邀请人的账号--->add collaborator--->copy invite link--->打开复制的link，点击Accept invitition
-  git push origin master


## 远程库修改的拉取
- git fetch origin master：把远程内容抓取下来，
- cat huashanjianfa.txt   ：可以看到
本地工作区文件并没有变
-  git checkout origin/master  
-  cat huashanjianfa.txt   ：可以看到
本地工作区文件已经更新
- git checkout master:      切换回master分支
- cat huashanjianfa.txt   ：文件回到原始的状态
- git merge origin/master：   远程本地合并
- cat huashanjianfa.txt   ：可以看到
本地工作区文件并没有变

说明：pull=fetch+merge

git fetch [远程库地址别名][远程分支名]

git merge [远程库地址别名/远程分支名]

## 协同开发时的冲突
### 要点
- 如果不是基于GitHub远程库的最新版本所做的修改，不能推送，必须先拉取
- 拉取下来后如果进入冲突状态，则按照“分支冲突解决”操作即可

## SSH免密登录
### 进入当前用户的家目录
- cd ~
### 删除.ssh目录
- rm -r .ssh/
### 运行命令生成.ssh秘钥目录
- ssh-keygen -t rsa -C 930275426@qq.com
- cd .ssh/ 
- ll  :可以看到生成了两个文件  id_rsa  和id_rsa.pub
-  cat id_rsa.pub  ：查看该文件内容，并复制文件内容
-  找到账户的SSH and GPG keys
-  new SSH keys
-  add SSH key
-  cd /d/workspace/git/huashan
-   vim huashanjianfa.txt
-    git commit -m "test ssh login" huashanjianfa.txt
-    git remote -v
-    git remote add origin_ssh git@github.com:fanfanbigeye/huashan.git
-    git remote -v
-    git push origin_ssh master
-    回复yes确认
-    刷新远程库，看到推送已经完成



