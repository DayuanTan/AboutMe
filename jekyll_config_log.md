# 最后没用上。我发现gist也支持图片了，那么用gist记笔记挺好的。不需要再搞个jekyll来支持markdown。


# Install

```
ruby --version
ruby 2.6.10p210 (2022-04-12 revision 67958) [universal.arm64e-darwin23]
```

macOS 自带了一个系统版本的 Ruby，但它通常不是最新版本。而且系统自带的 Ruby 可能在升级或安装一些 gem 时遇到权限问题。为了避免这些问题，建议使用 Homebrew 安装并管理 Ruby 版本。

```
brew install ruby

# add to path
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc

source ~/.zshrc

ruby --version
ruby 3.3.1 (2024-04-23 revision c56cd86388) [arm64-darwin23]

gem install bundler jekyll

bundle --version
Bundler version 2.5.10


jekyll -v
jekyll 4.3.3

```


# Jeykll

```
jekyll new myblog
cd myblog
```

在本地预览网站
```
bundle exec jekyll serve
```
http://127.0.0.1:4000/

http://127.0.0.1:4000/jekyll/update/2024/05/19/welcome-to-jekyll.html

http://127.0.0.1:4000/about/

# Config Jeykll for Github Pages

https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll 配置了Gemfile文件