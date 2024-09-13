#### 一.选择开发环境(Mac)以及产品的运行环境(Iphone)

** 绝对不能使用 sudo命令来安装任何依赖 ** 

1.Installing Ruby Gems一直处于loading阶段
-   `bundle config mirror.https://rubygems.org https://gems.ruby-china.com`
-   关闭vpm,重新初始化项目


2.如果执行`sudo gem install cocoapods -V` 的报错是因为ruby版本,可以通过rbenv来实现版本管理
-   brew install rbenv ruby-build
-   rbenv init      
-   echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
-   rbenv install 2.7.6
-   rbenv global 2.7.6


3.安装cocoapods命令
```bash
sudo gem install -n /usr/local/bin cocoapods
```

4.新建项目
```
npx react-native init AwesomeProject
```
-   cd ~/.cocoapods/repos
-   pod repo remove master
-   git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git master

5.运行 CocoaPods 安装命令
cd MyRnApp/ios
-   Podfile 文件第一行加上`source 'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'`
-   bundle install 
-   bundle exec pod install  


6.如果是某个.git文件clone不下来,需要用gitee替换;
-   VSCode 编辑器，打开目录 ~/.cocoapods/repos/master。
-   搜索无法安装的模块,如'github.com/facebook/flipper.git',用gitee替换;

7.如果安装了nvm,需要遵守[官网文档]();
-   将`~/.zshrc`文件中的将
```
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```
放到`~/.zshenv`


Errno::EACCES - Permission denied @ rb_sysopen - /Users/luojx/Library/Caches/CocoaPods/Pods/VERSION
-   需要删除Caches中的CocoaPods

有些命令前面千万不能加`sudo`,会出现权限的问题;

Error installing OpenSSL-Universal [!] /usr/bin/curl -f -L -o
-   直接按照报错信息去下载这个文件(有缓存),然后再执行` bundle exec pod install`


xcode 只能打开ios的文件夹信息,其他的打开会报错"could not open file";

鉴于 bundle exec pod install 安装依赖有时候 拉取代码时间会很长，我建议你第一次拉取成功后备份 ProjectRootDir/ios/Pods, 以后创建新项目可以直接复制到对应位置。删除 Pods.xcodeproj 重新执行 pod install --verbose 会新建这个文件，然后就可以愉快的 执行 yarn ios 继续开发代码了。对了不要使用 pnpm 去安装项目的 node 依赖。

搭建参考
[极客](https://time.geekbang.org/column/article/635210?code=FAqHFVRUur%2FgAP-yJQWitk9ieF80imRky3PVsIs%2FX6A%3D)
[掘金](https://juejin.cn/post/7270332737835335714?searchId=20231116192346A2E66D3297EA645EA6B6)
[CSDN](https://blog.csdn.net/weixin_46250314/article/details/133282633)