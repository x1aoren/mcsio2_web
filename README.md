# 二氧化硅生存服务器官网

本项目为“二氧化硅生存服务器”官方主页，基于 HTML+CSS+JavaScript 实现，界面美观，内容丰富，适合 Minecraft 服务器展示与推广。

## 主要功能
- 首页：展示服务器名、版本、特点、联系方式、服务器IP与QQ群号。
- 规则页：支持 Markdown 格式渲染，带有可折叠目录侧边栏，便于玩家查阅服务器规则。
- 管理组页：展示管理团队成员信息与头像，结构清晰。
- 商城页：内嵌 MinePay 商城，玩家可直接购买相关服务。
- 响应式设计，适配PC与移动端。
- 页脚统一展示 GitHub 项目地址。

## 页面结构
- `index.html`：首页
- `rules.html`：规则页面，自动加载 `rules.md` 内容
- `team.html`：管理组页面
- `shop.html`：商城页面（iframe嵌入）
- `style.css`：全站样式
- `rules.md`：规则内容（Markdown格式）
- `rules.js`：规则页逻辑

## 快速部署
1. 克隆本仓库：
   ```bash
   git clone https://github.com/x1aoren/mcsio2_web.git
   ```
2. 进入项目目录，使用本地服务器（如 Python、Node.js、VSCode Live Server 等）启动：
   ```bash
   # Python 3
   python -m http.server 8080
   # 或用 VSCode Live Server 插件
   ```
3. 浏览器访问 `http://localhost:8080/index.html` 即可。

> **注意：** 直接用浏览器打开 HTML 文件（file://）会导致部分功能（如规则页加载、商城嵌入）无法正常使用，务必通过本地服务器访问。

## 贡献与反馈
- 欢迎 Issue、PR 及建议！
- GitHub地址：[https://github.com/x1aoren/mcsio2_web](https://github.com/x1aoren/mcsio2_web)

## 版权声明
- 本项目仅供学习与交流，内容归“二氧化硅生存服务器”所有。 